<template>
    <div class="field-row md:pl-12 relative pb-10 mb-10 border-b border-grey-lighter"
        v-if="row.field.permissions.hidden != true">
        <span class="hidden absolute pin-l -ml-2 bg-grey-lighter field-row-count text-xs text-grey-dark rounded-full h-8 w-8 items-center justify-center" :class="{ 'md:flex': ( canShow('counter') ) }">
            {{ number }}
        </span>
        <label v-show="canShow('name')" class="block mb-2 text-grey" :for="row.field.handle">{{ row.field.name }}</label>
        <div class="text-2xl leading-normal block mb-2 text-grey-darker" v-if="canShow('label')"
            v-html="row.options.label || row.field.label">
        </div>
        <SurveyFieldsetRowField :row="row" :model="model" :field="row.field"></SurveyFieldsetRowField>
        <div class="row-instructions" v-if="row.field.instructions" v-html="row.field.instructions"></div>
    </div>
</template>
<script>
    import SurveyFieldsetRowField from './RowField'

    export default {
        components: {
            SurveyFieldsetRowField
        },
        props: ['row', 'number', 'model'],
        methods: {
            canShow(param) {
                return ( this.row.options.hide ) ? this.row.options.hide.indexOf(param) == -1 : true
            }
        }
    }
</script>
<style>
    fieldset .field-row:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    .row-instructions {
        @apply mt-4;
    }
    .row-instructions p {
        @apply text-xl mb-3;
    }
</style>
