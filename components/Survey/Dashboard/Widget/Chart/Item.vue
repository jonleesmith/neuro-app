<template>
    <component
        :library="library"
        :min="0"
        :colors="colours"
        :max="( row.field.type == 'NPS' ) ? 10 : row.field.options.options.length"
        :download="row.field.handle"
        :messages="{ empty: 'No data' }"
        :data="data"
        :is="`${type}-chart`"
        :donut="true">
    </component>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex'

    export default {
        props: ['type', 'data', 'row'],
        data() {
            return {
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
                    onClick: (context, chartElement) => {
                        let element = chartElement[0]
                        if ( element ) {
                            let dataset = element._datasetIndex
                            let index = element._index
                        }
                    },
                    annotation: {
                        annotations: []
                    }
                }
            }
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
