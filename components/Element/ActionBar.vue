
<template>

    <div class="action-bar">

        <div class="actions flex py-3 px-6 border-t border-gray-200" v-show="selected.length > 0">

            <span class="total">
                {{ selected.length }} {{ (selected.length === 1) ? 'element' : 'elements' }} selected.
            </span>

            <!-- v-if="!action.limit || action.limit >= selected.length" -->
            <div class="action-link" v-for="(action, i) in elementActions" :key="i">
                <a href="#"
                    v-for="(option, key) in action.options"
                    :key="key"
                    class="text-grey-dark hover:text-blue ml-3" :class="'action-' + action.name"
                    @click.prevent="triggerAction(action, option)" >
                    <span class="text">{{ option.label }}</span>
                </a>
                <a
                    v-if="!action.options"
                    href="#"
                    @click.prevent="triggerAction(action)"
                    class="action" :class="'action-' + action.name">
                    <span class="text">{{ action.label }}</span>
                </a>
            </div>

        </div>

    </div>


</template>

<script>
    export default {

        props: {

            controller: Object,

            elementActions: {
                type: Array,
                default: () => []
            },

            selected: {
                type: Array,
                default: () => []
            }

        },

        methods: {

            triggerAction(action, child)
            {
                action.handler.call(this.controller, this.selected, child);
                this.$emit('clear-selected');
            },

        }

    }
</script>
