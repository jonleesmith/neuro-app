
<template>
    <div class="widget-inner">
         <SurveyDashboardWidgetChartItem :row="row" :data="averageSets()" type="column"></SurveyDashboardWidgetChartItem>
    </div>

</template>


<script>

    import SurveyDashboardWidgetChartItem from '~/components/Survey/Dashboard/Widget/Chart/Item'

    import { mapGetters, mapActions } from 'vuex'
    import { find, slice } from 'lodash'

    export default {
        components: {
            SurveyDashboardWidgetChartItem
        },
        props: ['widget'],
        methods: {
            averageSets() {

                let dataSet = {}

                let attributes = {}

                let attribute = find(this.user.org.attributes, { id: this.widget.options.attribute })

                if ( !attribute ) {
                    return;
                }

                for ( let key in attribute.options )
                {
                    let option = attribute.options[key]
                    attributes[option.name] = []
                }

                let responses = this.rawResponses.map( response => {
                    console.log(response.fields, attribute.handle)
                    let option = response.fields[attribute.handle + '_select']
                    // console.log({option})
                    if ( attributes[option] )
                    {
                        console.log(option, this.row.field.handle)
                        let value = response.fields[this.row.field.handle]
                        value = ( value === Object(value) ) ? value.score : value
                        if ( value ) {
                            attributes[option].push(value)
                        }
                    }
                })

                for ( let attribute in attributes )
                {
                    let result = attributes[attribute]

                    if ( result.length )
                    {
                        let sum = result.reduce((previous, current) => {
                            return parseInt(current) + parseInt(previous)
                        });

                        let avg = sum / result.length;

                        attributes[attribute] = avg.toFixed(1)
                    }
                    else
                    {
                        attributes[attribute] = 0
                    }
                }

                return attributes

            },
        },
        computed: {
            ...mapGetters({
                rawResponses: 'dashboard/rawResponses',
                dataSets: 'dashboard/dataSets',
            }),
            row() {
                return this.widget.row
            }
        }
    }

</script>
