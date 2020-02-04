<template>
    <div>
        <div class="py-4 px-8 bg-grey-lighter text-left border-b-2 border-white flex items-center">
            <div class="w-1/2 flex items-center">
                <span class="block w-4 h-4 mr-3 rounded" :style="{ background: colours[index] }"></span> <input type="text" class="text-grey-darkest outline-none w-5/6 bg-transparent" v-model="name" />
            </div>
            <div class="w-1/2 text-right items-center">
                <button class="pr-1 text-xs uppercase text-grey-darker" @click.prevent="configure = !configure">
                    <i class="text-grey-darker fa fa-filter"></i>Filters
                </button>
                <button class="ml-4 pr-1 text-xs uppercase text-grey-darker" @click.prevent="removeSet(dataSet)" v-if="dataSets.length > 0">
                    <i class="fa fa-times text-grey-darker"></i>Remove
                </button>
            </div>
        </div>
        <div class="p-8" v-if="configure">
            <SurveyDashboardFilterOption :set="dataSet" :filter="type" v-for="(type, i) in attributes" :key="i">
            </SurveyDashboardFilterOption>
            <p class="-mt-6">Found <strong>{{ dataSet.data.length }}</strong> results</p>
        </div>
    </div>
</template>
<script>

    import SurveyDashboardFilterOption from '~/components/Survey/Dashboard/Filter/Option'

    import { mapActions, mapGetters } from 'vuex'

    export default {

        props: ['dataSet', 'index'],

        components: {
            SurveyDashboardFilterOption
        },

        data() {
            return {
                configure: false
            }
        },

        methods: {

            removeSet() {
                this.removeDataSet(this.index)
            },

            ...mapActions({
                updateDataSet: 'dashboard/updateDataSet',
                removeDataSet: 'dashboard/removeDataSet',
            })

        },

        computed: {

            name: {

                get() {
                    return this.dataSet.name
                },

                set(val) {
                    this.updateDataSet({ set: this.dataSet, field: 'name', value: val })
                }

            },

            ...mapGetters({
                options: 'filters/options',
                colours: 'dashboard/colours',
                dataSets: 'dashboard/dataSets',
                attributes: 'resources/attributes'
            }),

        }

    }
</script>
