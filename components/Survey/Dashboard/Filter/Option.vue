
<template>
    <div class="filter-box">
        <p class="filter-name">{{ filter.name }}</p>
        <div class="filter-input">
            <input @focus="onFocus" @blur="onBlur" @keyup="onKeyup" type="text" class="input" v-model="input" :placeholder="`Search...`">
            <div v-if="activeFilters.length" class="selected-items">
                <span
                    v-for="(filter, key) in activeFilters"
                    :key="key" class="selected-filter"
                    @click.prevent="removeFilter(filter)">
                    <i class="fa fa-times"></i>{{ filter.option.name }}
                </span>
            </div>
        </div>
        <ul class="option-list" v-if="showSuggested && suggested.length" @hover="showSuggested = true">
            <li v-for="(item, key) in suggested" :key="key" v-if="!isActiveFilter(item)">
                <a href="/" @click.prevent="addSelectedFilter(item)">{{ item.name }}</a>
            </li>
        </ul>
    </div>

</template>

<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: {
            set: {
                type: Object
            },
            filter: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                type: this.filter,
                input: '',
                suggested: [],
                selected: [],
                showSuggested: false,
            }
        },
        methods: {
            ...mapActions({
                addFilter: 'dashboard/addFilter',
                filterResponses: 'dashboard/filterResponses',
                removeActiveFilter: 'dashboard/removeActiveFilter',
            }),
            isActiveFilter(item) {
                let found = this.activeFilters.filter( ({type, option}) => {
                    return (option.id == item.id)
                })
                return found.length
            },
            onFocus() {
                this.suggested = this.filter.options
                this.showSuggested = true
            },
            onBlur(event) {
                setTimeout( () => {
                    if ( this.input.length === 0 ) {
                        this.showSuggested = false
                    }
                }, 500)
            },
            onKeyup() {
                let value = this.input
                this.showSuggested = true
                if ( value.length )
                {
                    this.suggested = this.filter.options.filter( item => {
                        if ( item.name.toLowerCase().includes(value.toLowerCase()) ) {
                            return item
                        }
                    })
                }
                else {
                    this.suggested = this.filter.options
                }
            },
            removeFilter(filter) {
                this.removeActiveFilter({
                    type: filter.type,
                    set: this.set,
                    option: filter.option
                })
                this.showSuggested = false
            },
            addSelectedFilter(option) {
                this.addFilter({
                    type: this.type,
                    option,
                    set: this.set
                })
                this.showSuggested = false
                this.input = ''
            }
        },
        computed: {
            filters() {
                return this.set.filters
            },
            activeFilters() {
                return this.filters.filter(({type}) => {
                    return (type == this.type)
                })
            }
        }
    }

</script>

<style>

    .filter-box {
        @apply relative mb-10;
    }

    .filter-name {
        @apply mb-2 text-grey-darker;
    }

    .filter-input .input,
    .filter-input .input:focus {
        @apply border-grey-light;
    }

    .selected-filter {
        @apply cursor-pointer inline-block p-1 px-3 rounded bg-grey-lighter mr-2 mb-2;
    }

    .option-list {
        position: absolute;
        top: 75px;
        left: 0;
        width: 100%;
        margin: 0; padding: 0;
        list-style: none;
        z-index: 100;
    }

    .option-list li {
        @apply block border-t border-l border-r border-grey-light;
    }

    .option-list li:last-child {
        @apply border-b;
    }

    .option-list li a {
        @apply block px-6 py-4 bg-grey-lightest text-grey-darker;
    }

    .option-list li a:hover {
        @apply bg-grey text-white;
    }


</style>
