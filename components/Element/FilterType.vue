<template>
    <div class="filter-option dropdown-trigger relative">
        <a class="py-3 px-4 text-grey-darker" data-toggle="dropdown" href="#">
            <i class="fa fa-filter text-xs"></i>
            {{ filter.label }}:
            <span v-if="activeFilter.label">{{ activeFilter.label }}</span>
            <span v-else>All</span>
            <i class="fa fa-caret-down"></i>
        </a>
        <ul class="dropdown-select absolute right-0">
            <li><a href="#" @click.prevent="resetFilter">All</a></li>
            <li v-for="option in filter.options" :key="option" :class="{ 'selected': activeFilter.value === option.value }">
                <a href="#" @click.prevent="setFilter(filter, option)">
                    {{ option.label }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {

        props: [ 'filter', 'controller' ],

        data() {
            return {
                options: [],
                active: {
                    [this.filter.field] : {}
                }
            }
        },

        methods: {

            getOptions(type) {
                return []
            },

            transform(items)
            {

                let options = [];

                items.forEach( (item, key) => {

                    options.push({
                        value: item.system.id,
                        label: item.name
                    });

                });

                return options;

            },

            resetFilter()
            {
                this.active[this.filter.field] = {};
                this.controller.params = {};
                // this.$router.push({
                //  name: `${this.controller.endpoint}`
                // });
            },

            setFilter(filter, option)
            {
                this.active[this.filter.field] = option;
                this.controller.params = { [filter.field] : option.value };
                // this.$router.push({
                //  name: `${this.controller.endpoint}`,
                //  query: { [filter.field] : option.value }
                // });
            }

        },

        computed: {
            activeFilter() {
                return this.active[this.filter.field];
            }
        }

    }
</script>
