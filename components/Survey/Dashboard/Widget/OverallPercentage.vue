
<template>

    <div class="chart doughnut-chart" v-if="dataSets[0]">
        <component :min="0" :max="5" :is="'pie-chart'" :data="getDataSets()"></component>
        <p class="h5" style="text-align: center; margin: 20px 0 0;">
            <strong>{{ (getDataSets()['Very Satisfied'] * 100 / dataSets[0].length).toFixed(0) }}%</strong>
            of people were Very Satisfied
        </p>
    </div>

</template>


<script>
    import { find, slice } from 'lodash'

    export default {
        data() {
            return {
                colors: ['green',
            'blue',
            'purple',
            'orange',
            'red',
            'rgba(53, 59, 72,1.0)',
            'rgba(64, 115, 158,1.0)',
            'rgba(251, 197, 49,1.0)',
            'rgba(0, 168, 255,1.0)',
            'rgba(95, 39, 205,1.0)',
            'rgba(255, 159, 67,1.0)',
            'rgba(243, 104, 224,1.0)'],
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
                year: '2018',
                office: '',
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
                let options = [
                    'Very Dissatisfied',
                    'Fairly Dissatisfied',
                    'Neither',
                    'Fairly Satisfied',
                    'Very Satisfied'
                ];
                let results = {
                    'Very Satisfied': 0,
                    'Fairly Satisfied': 0,
                    'Neither': 0,
                    'Fairly Dissatisfied': 0,
                    'Very Dissatisfied': 0,
                };
                let dataSets = [];

                // for ( let i in slice(set, 0, this.limit) )
                for ( let i in this.dataSets[0] )
                {

                    let item = this.dataSets[0][i];
                    if ( item[this.field.handle] != "" && !isNaN(item[this.field.handle])  )
                    {
                        results[options[item[this.field.handle] - 1]]++;
                    }

                } // end for

                // this.dataSets.map((set, key) => {



                // })


                return {
                    'Very Satisfied': results['Very Satisfied'],
                    'Fairly Satisfied': results['Fairly Satisfied'],
                    'Neither': results['Neither'],
                    'Fairly Dissatisfied': results['Fairly Dissatisfied'],
                    'Very Dissatisfied': results['Very Dissatisfied'],
                };

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
