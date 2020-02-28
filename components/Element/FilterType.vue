<template>
    <div class="relative inline-block text-left" v-on-clickaway="close">
        <div>
            <span class="rounded-md shadow-sm">
                <button
                    type="button"
                    class="inline-flex justify-center w-full rounded border bg-gray-300 px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-indigo-500 transition ease-in-out duration-150"
                    @click.prevent="open = !open">
                    {{ filter.label }}:&nbsp;
                    <span v-if="activeFilter.label">{{ activeFilter.label }}</span>
                    <span v-else>All</span>
                    <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </span>
        </div>
        <div v-show="open" class="origin-top-right absolute right-0 mt-1 w-56 rounded-md shadow-lg">
            <div class="rounded bg-white shadow">
                <div class="py-0">
                <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" @click.prevent="resetFilter">All</a>
                </div>
                <div class="border-t border-gray-200"></div>
                <div class="py-0">
                <a
                    class="block px-4 py-2 leading-5 text-gray-500 hover:bg-indigo-600 hover:text-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    href="#"
                    v-for="(option, key) in filter.options" :key="key" :class="{ 'selected': activeFilter.value === option.value }"
                    @click.prevent="setFilter(filter, option)">
                    {{ option.label }}
                </a>
                </div>
            </div>
        </div>
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
                },
                open: false,
            }
        },

        methods: {

            close() {
                this.open = false
            },

            getOptions(type) {
                return []
            },

            transform(items)
            {

                let options = [];

                items.forEach( (item, key) => {

                    options.push({
                        value: item.id,
                        label: item.name
                    });

                });

                return options;

            },

            resetFilter()
            {
                this.active[this.filter.field] = {};
                this.controller.params = {};
                this.$router.push({
                    query: {}
                });
                this.open = false
            },

            setFilter(filter, option)
            {
                this.active[this.filter.field] = option;
                this.controller.params = { [filter.field] : option.value };
                this.$router.push({
                    query: { [filter.field] : option.value }
                });
                this.open = false
            }

        },

        computed: {
            activeFilter() {
                return this.active[this.filter.field];
            }
        }

    }
</script>
