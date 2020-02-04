<template>
    <div>
        <div class="filter-bar w-full lg:w-1/4" :class="{ 'active' : showToolbar }">
            <div class="text-right border-b border-grey-lighter py-3 px-8">
                <button class="px-2 py-1 rounded bg-grey text-white text-xs icon" @click.prevent="toggleToolbar">
                    <i class="fa fa-times"></i>
                </button>
            </div>
            <SurveyDashboardFilterDataSet
                v-for="set, index in dataSets" :key="index"
                :data-set="set"
                :index="index">
            </SurveyDashboardFilterDataSet>
            <button class="block w-full py-4 uppercase tracking-x-wide text-xs bg-grey text-white text-center" @click.prevent="addSet">
                <i class="fa fa-plus"></i>Add Set
            </button>
            <div class="p-8">
                <p class="uppercase text-xs tracking-x-wide mb-4">Presets</p>
                <ul>
                    <li v-for="attribute in attributes" class="mb-3" v-if="attribute.handle != 'staff_member'">
                        <button
                            @click.prevent="addPreset(attribute)"
                            class="block w-full px-3 py-2 rounded bg-grey-light text-grey-darker">
                            {{ attribute.name }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

    import SurveyDashboardFilterDataSet from '~/components/Survey/Dashboard/Filter/DataSet'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: ['filters'],
        components: {
            SurveyDashboardFilterDataSet
        },
        data() {
            return {
                activeSet: 0,
            }
        },
        computed: {
            ...mapGetters({
                showToolbar: 'dashboard/showToolbar',
                dataSets: 'dashboard/dataSets',
                attributes: 'resources/attributes',
            }),
        },
        methods: {
            ...mapActions({
                toggleToolbar: 'dashboard/toggleToolbar',
                addDataSet: 'dashboard/addDataSet',
                clearDataSets: 'dashboard/clearDataSets',
                addFilter: 'dashboard/addFilter',
            }),
            addPreset(filter) {

                this.clearDataSets();

                for ( let i = 0; i < filter.options.length; i++ )
                {
                    let item = filter.options[i]
                    this.addDataSet({ name: item.name })
                    this.addFilter({
                        type: filter,
                        option: item,
                        set: this.dataSets[this.dataSets.length - 1]
                    })
                }
            },
            addSet() {
                this.addDataSet()
                this.activeSet = this.dataSets.length - 1
            }
        },
    }
</script>
<style>
    .filter-bar {
        @apply fixed pin-t pin-r bg-white h-screen shadow-lg;
        overflow-y: scroll;
        transition: transform .3s ease-in-out;
        transform: translateX(100%);
        z-index: 1000;
    }

    .filter-bar.active {
        transform: translateX(0%);
    }
</style>
