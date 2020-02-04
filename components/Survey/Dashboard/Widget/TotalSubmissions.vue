
<template>
	<div class="chart doughnut-chart">
    	<component :is="'column-chart'" :data="getDataSets()"></component>
    </div>
</template>

<script>
    import { find, slice } from 'lodash'

	export default {
        data() {
            return {
                selectedMonths: [
                    'Jan',
                    'Feb',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'Aug',
                    'Sept',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                defaultData: this.data,
                colourSets: [],
                monthsData: [],
                options: {
                    scales: {
                        xAxes:[{}],
                         yAxes: [{}]
                    },
                    annotation: {
                        annotations: []
                    }
                }
            }
        },
        created() {

            ['rgba(232, 65, 24,1.0)',
            'rgba(156, 136, 255,1.0)',
            'rgba(68, 189, 50,1.0)',
            'rgba(127, 143, 166,1.0)',
            'rgba(39, 60, 117,1.0)',
            'rgba(53, 59, 72,1.0)',
            'rgba(64, 115, 158,1.0)',
            'rgba(251, 197, 49,1.0)',
            'rgba(0, 168, 255,1.0)',
            'rgba(95, 39, 205,1.0)',
            'rgba(255, 159, 67,1.0)',
            'rgba(243, 104, 224,1.0)'].forEach(colour => {
                this.colourSets.push({
                    borderColor: colour,
                    pointBackgroundColor: colour,
                    pointBorderColor: colour,
                    backgroundColor: colour.replace(',1.0)', ',.9)'),
                })
            })
        },
		props: {
            extraData: Array,
            data: {
                type: Array
            },
            dataSets: {
                type: Array
            },
            filters: {
                type: Array
            },
            limit: {
                type: Number
            },
            chartType: {
                type: String,
                default: 'scatter'
            },
			field: {
                type: Object
            }
		},
        methods: {
            getColourSet(i) {
                return this.colourSets[i];
            },
            getLabelForSet(key) {
                return '';
                // return 'Last 3 Months';
                return Object.keys(this.widgetFilters[key]).map( (item) => {
                    let value = this.widgetFilters[key][item];
                    if ( item == 'staffMember' ) { item = 'staff' }
                    if ( value && item != 'applied' )
                    {
                        // return `${item}: ${value}\n`
                        return `${value}\n`
                    }
                    return '';
                }).join('')
            },
            getLabels() {
                let labels = [];
                return this.getMonthLabels;
            },
            getDataSets() {
                let months = [];
                let dataSets = [];
                let d = new Date()

                this.dataSets.map((set, key) => {

                    dataSets.push({
                        name: this.filters[key].office + this.filters[key].staffMember,
                        data: {}
                    });

                    for ( let i in set )
                    {

                        let item = set[i];

                        let subMonth = parseInt(item.date.split('/')[1]);

                        if ( !months[subMonth - 1] )
                        {
                            months[subMonth - 1] = [];
                        }

                        months[subMonth - 1].push({});

                    } // end for

                    let data = [];
                    let period = this.getLast12Months();


                    period.reverse().forEach( (month, m) => {
                        let i = month.split(':')[0];
                        let selMonth = months[i]

                        if ( selMonth )
                        {
                            // dataSets[key].data[this.selectedMonths[i] + month.split(':')[1]] = avg.toFixed(1);
                            dataSets[key].data[this.selectedMonths[i]] = selMonth.length;
                        }
                    })

                });

                return dataSets

            },
            getLast12Months() {
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth();
                let last12 = [];
                let i;
                for ( i = 0; i < 12; i++ )
                {
                    last12.push(`${month}:${year}`);
                    month--;
                    if ( month == -1 ) { month = 11; year--; }
                }
                return last12;
            }

        },
		computed : {

            getMonthLabels() {
                return [
                    'Jan',
                    'Feb',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'Aug',
                    'Sept',
                    'Oct',
                    'Nov',
                    'Dec'
                ];
            },

			createDataset()
			{
				return {
					labels : this.getLabels(),
					datasets : this.getDataSets()
				}
			}

		}
	}

</script>
