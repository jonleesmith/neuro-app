<template>

    <div class="filter-bar flex py-2 px-6 items-center justify-between" v-if="controller">

        <div class="search w-1/3">
            <NeuroSearchBar></NeuroSearchBar>
        </div>
        <div class="filters w-2/3 text-right flex items-center justify-end">
            <NeuroFilterType
                class="px-1 bg-gray-200 text-gray-800 py-2 ml-8"
                :key="key"
                v-for="(filter, key) in controller.filters"
                :controller="controller"
                :filter="filter">
            </NeuroFilterType>
        </div>

    </div>


</template>

<script>

    import NeuroFilterType from '~/components/Element/FilterType.vue'
    import NeuroSearchBar from '~/components/Element/SearchBar.vue'

    export default {

        name: 'neuro-filter-bar',

        props: [
            'controller',
            'search-elements'
        ],

        components: {
            NeuroFilterType,
            NeuroSearchBar
        },

        data() {
            return {
                active: {}
            }
        },

        methods: {

            setFilter(filter) {
                this.active = filter;
            },
            resetFilter() {
                this.active = {};
            }

        }

    }
</script>
