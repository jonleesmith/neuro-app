<template>
    <div>
        <div class="form-row setting" v-for="field in schema" v-show="!field.hidden">
            <label :for="field.handle">
                {{ field.label }}
                <span class="text-red" v-if="field.required">*</span>
                <span class="error" v-if="form.errors.has(field.handle)">{{ form.errors.get(field.handle) }}</span>
            </label>
            <span class="help" v-if="field.help" v-text="field.help"></span>
            <div class="option">
                <SurveyFieldsetRowField :row="{ field: field }" :field="field" :model="form.model"></SurveyFieldsetRowField>
            </div>
        </div>
    </div>
</template>
<script>
    import SurveyFieldsetRowField from '~/components/Survey/Fieldset/RowField'

    export default {
        props: ['form', 'schema'],
        components: {
            SurveyFieldsetRowField,
        }
    }
</script>
