<template>
    <ul class="dropdown-select" v-show="open">
        <li v-for="option, key in options"><a href="#" @click.prevent="selectOption(option)">{{ option.label }}</a></li>
    </ul>
</template>
<script>
    export default {
        props: {
            open: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            selectOption(option) {
                this.$emit('select', option)
            }
        }
    }
</script>
