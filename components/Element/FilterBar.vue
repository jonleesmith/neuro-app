<template>

    <div class="filter-bar flex py-2 px-6 items-center justify-between" v-if="controller">

        <div class="search w-1/3">
            <NeuroSearchBar></NeuroSearchBar>
        </div>
        <div class="w-2/3 text-right flex items-center justify-end">
            <NeuroFilterType
                :key="key"
                class="ml-3"
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
