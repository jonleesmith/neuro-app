<template>

    <div class="controller-view bg-white shadow">

        <slot name="element-index-top"></slot>

        {{ items }}

        <!-- <NeuroFilterBar :controller="controller">
        </NeuroFilterBar> -->

        <!-- <NeuroActionBar :selected="selectedElements"
            :controller="controller"
            :element-actions="elementActions"
            @clear-selected="selectedElements = []">
        </NeuroActionBar> -->

        <template>

            <component :is="`NeurotableView`"
                :selected="selectedElements"
                :controller="controller"
                :elements="items"
                :user="user"
                @view-element="viewElement"></component>

        </template>

    </div>

</template>

<script>

    // import NeuroActionBar from '~/components/Element/ActionBar.vue'
    // import NeuroFilterBar from '~/components/Element/FilterBar.vue'
    import NeurotableView from '~/components/Element/View/Table.vue'

    export default {

        name: 'element-index',

        props: ['controller'],

        components: {
            // NeuroActionBar,
            // NeuroFilterBar,
            NeurotableView,
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
            this.items = this.controller.all()
            console.log(new this.controller)
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
