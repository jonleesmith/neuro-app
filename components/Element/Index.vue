<template>

    <div class="controller-view bg-white shadow rounded">

        <slot name="element-index-top"></slot>

        <NeuroFilterBar :controller="controller" v-if="search">
        </NeuroFilterBar>

        <NeuroActionBar :selected="selectedElements"
            :controller="controller"
            :element-actions="controller.elementActions"
            @clear-selected="selectedElements = []">
        </NeuroActionBar>

        <template>

            <component :is="`NeuroTable`"
                :selected="selectedElements"
                :controller="controller"
                :elements="items"
                :user="user"
                @view-element="viewElement">
                <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>
                </component>

        </template>

    </div>

</template>

<script>

    import NeuroActionBar from '~/components/Element/ActionBar.vue'
    import NeuroFilterBar from '~/components/Element/FilterBar.vue'
    import NeuroTable from '~/components/Element/Table.vue'

    export default {

        name: 'element-index',

        props: ['controller', 'search'],

        components: {
            NeuroActionBar,
            NeuroFilterBar,
            NeuroTable,
        },

        data() {
            return {
                loading: false,
                items: [],
                params: this.$route.query,
                selectedElements: []
            }
        },

        mounted() {
            this.controller.all()
                .then(items => {
                    this.items = items
                })
        },

        watch: {
            '$route': 'getElements',
            'controller.params': 'getElements'
        },

        methods: {

            getElements(route)
            {
                // this.controller.getElements(route.query);
                this.controller.all(this.controller.params);
            },

            viewElement(element)
            {
                this.controller.element = element;
            }

        },

        computed: {

            elementActions() {
                return this.controller.getElementActions();
            },

            model() {
                return this.controller.element.model;
            },

            elements() {
                return this.controller.elements;
            }

        }

    }

</script>
