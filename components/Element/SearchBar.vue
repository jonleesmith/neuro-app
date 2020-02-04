<template>

    <form class="element-search" @submit.prevent="processSearch">
        <div class="form-row flex items-center">
            <input v-model="query" type="text" class="search-input py-3 w-full focus:outline-none" placeholder="Search..." />
            <i class="fa fa-search text-grey"></i>
        </div>
    </form>
</template>

<script>

    export default {

        props: [ 'context' ],

        data() {
            return {
                query: ''
            }
        },

        methods: {
            processSearch() {
                this.$emit('search', this.query);
            }
        },

        computed: {

            element() {
                return this.context || 'everything';
            }

        }

    }

</script>
