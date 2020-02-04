
<template>
    <div class="chart flex">
        <div>
            <component
                :library="library"
                :min="0"
                :colors="colours"
                :max="( row.field.type == 'NPS' ) ? 10 : row.field.options.options.length"
                :download="row.field.handle"
                :messages="{ empty: 'No data' }"
                :data="totalSets()"
                :is="`pie-chart`"
                :donut="true">
            </component>
        </div>
        <div class="ml-6 w-3/4">
             <component
                :library="library"
                :min="0"
                :max="( row.field.type == 'NPS' ) ? 10 : row.field.options.options.length"
                :download="row.field.handle"
                :messages="{ empty: 'No data' }"
                :colors="colours"
                :data="averageSets()"
                :is="`line-chart`">
            </component>
        </div>
    </div>

</template>


<script>
    import { mapGetters, mapActions } from 'vuex'
    import { find, slice } from 'lodash'
    import moment from 'moment'

    export default {
        data() {
            return {
                height: 300,
                benchmark: [],
                library: {
                    tooltips: {
                        enabled: true,
                        mode: 'point',
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 10
                        }
                    },
                    onClick: (context, event) => {
                        if ( event[0] ) {
                            alert(event[0])
                        }
                    },
                    annotation: {
                        annotations: []
                    }
                }
            }
        },
        props: {
            filters: {
                type: Array
            },
            limit: {
                type: Number
            },
            chartType: {
                type: String
            },
            row: {
                type: Object
            },
            fullView: {
                type: Object
            },
            data: {
                type: Array,
                default: () => []
            }
        },
        created() {
            this.addTrendLine()
        },
        methods: {
            ...mapActions({
                updateWorkingMonth: 'dashboard/updateWorkingMonth',
            }),
            totalSets() {

                let results = {}
                let options = [ ...this.row.field.options.options ]

                options.forEach(option => {
                    results[option] = []
                })

                this.rawResponses.forEach( response => {
                    let value = response.fields[this.row.field.handle];
                    value = ( value === Object(value) ) ? value.score : value

                    if ( value && options[value - 1] )
                    {
                        results[options[value - 1]].push(value)
                    }
                })

                let count = {}
                for ( let i in results ) {
                    let result = results[i]
                    count[`${i} ${Math.round(result.length * 100 / this.rawResponses.length.toFixed(0))}%`] = `${result.length}`
                }

                return count

            },
            averageSets() {

                let dataSets = []

                for ( let set in this.dataSets )
                {

                    let data = this.dataSets[set].data

                    if ( !Array.isArray(data) ) {
                        return
                    }

                    let months = {}

                    for ( let month in this.workingMonths )
                    {
                        months[month] = []
                    }

                    let responses = data.map( response => {
                        let date = moment(response.completed_date).format('MMM YYYY')
                        if ( months[date] )
                        {
                            let value = response.fields[this.row.field.handle]
                            value = ( value === Object(value) ) ? value.score : value
                            if ( value ) {
                                months[date].push(value)
                            }
                        }
                    })

                    for ( let month in months )
                    {
                        let result = months[month]
                        if ( result.length )
                        {
                            let sum = result.reduce((previous, current) => {
                                return parseInt(current) + parseInt(previous)
                            });

                            let avg = sum / result.length;

                            months[month] = avg.toFixed(1)
                        }
                        else
                        {
                            months[month] = 0
                        }
                    }

                    dataSets.push({
                        name: this.dataSets[set].name,
                        data: months
                    })

                }


                return dataSets

            },
            addTrendLine() {

                let sortable = [ ...this.rawResponses ];

                let results = sortable.map( response => {
                    let value = response.fields[this.row.field.handle]
                    value = ( value === Object(value) ) ? value.score : value
                    return value
                }).sort((a, b) => a - b);

                let lowMiddle = Math.floor((results.length) / 2);
                let highMiddle = Math.ceil((results.length) / 2);

                // this.library.annotation.annotations.push({
                //     type: 'line',
                //     mode: 'horizontal',
                //     scaleID: 'y-axis-0',
                //     value: lowMiddle,
                //     endValue: highMiddle,
                //     borderColor: 'rgb(75, 192, 192)',
                //     borderWidth: 2,
                //     label: {
                //       enabled: false,
                //       content: 'Trendline',
                //       yAdjust: 0,
                //     }
                // });

            },
            ...mapActions({
                updateDataSet: 'dashboard/updateDataSet'
            })
        },
        computed: {
            ...mapGetters({
                workingMonths: 'dashboard/workingMonths',
                rawResponses: 'dashboard/rawResponses',
                dataSets: 'dashboard/dataSets',
                colours: 'dashboard/colours',
            })
        }
    }

</script>

<style>
    .message {
        /*padding: 10px;*/
        background: #f9f9f9;
        border: 1px solid #eee;
        border-radius: 3px;
    }

    .message,
    .close {
        cursor: pointer;
    }
</style>
