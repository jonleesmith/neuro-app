
<template>

	<div>
    	<!-- <component :is="config.type + '-chart'" :options="options" :chart-data="createDataset"></component> -->
    </div>

</template>


<script>
    import { find, slice } from 'lodash'

	export default {

		props: {
            dataSets: {
                type: Array
            },
            limit: {
                type: Number
            },
			config: {
                type: Object
            },
            options: {
                type: Object
            }
		},
        methods: {
            prepData() {
                let data = [];

                this.dataSets.map((set) => {
                    console.log(set);
                })

                for ( let i in this.getData() )
                {
                    let item = this.data[i];
                    data.push(item[this.config.field.handle])
                }
                return [
                    {
                        label: "Answer",
                        data: data,
                        borderColor: 'rgba(239,77,22, .9)',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: 'rgba(239,77,22, 1)',
                        backgroundColor: 'rgba(239,77,22, .1)',
                        borderWidth: 1
                    }
                ]
            }
        }
	}

</script>
