<template>
    <div>
        <line-chart :chart-data="chartData"></line-chart>
    </div>
</template>

<script>
    import { find, groupBy } from 'lodash'

    export default {
        props: {
            dataSets: {
                type: Array
            },
            limit: {
                type: Number
            },
            field: {
                type: Object
            },
            options: {
                type: Object
            }
        },
        methods: {
            prepData() {
                let data = [];
                for (let i in this.field.options) {
                    let item = this.field.options[i];
                    data.push(this.getFieldCount(item))
                };
                return [
                    {
                        label: "Total",
                        data: data,
                        borderColor: 'rgba(239,77,22, .9)',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: 'rgba(239,77,22, 1)',
                        backgroundColor: 'rgba(239,77,22, .1)',
                        borderWidth: 1
                    }
                ]
            },
            getFieldData() {
                return [];
                // return this.data.map( item => item[this.field.handle] )
            },
            getFieldCount(check) {
                var total = 0;
                let arr = this.getFieldData();
                for (var i = 0; i < arr.length; i++)
                {
                    let item = arr[i];
                    if ( item == check ) { total++; }
                }
                return total;
            }
        },
        computed: {
            chartData() {
                return {
                    // labels : this.field.options,
                    datasets : this.prepData()
                }
            }
        }
    }
</script>
