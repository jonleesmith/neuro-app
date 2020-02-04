<template>
    <div>
        <div class="flex py-4 w-full px-6 bg-white shadow border border-grey-lighter" v-if="addField">
            <div class="select-wrapper w-3/4">
                <select class="select" v-model="fieldKey">
                    <option value="">--- Select a field ---</option>
                    <option v-for="(field, i) in fields" :key="field.id" :value="i">
                        {{ field.name }} - {{ field.type }}
                    </option>
                </select>
            </div>
            <button
                class="w-1/4 bg-green text-white"
                :disabled="!field"
                @click.prevent="saveRow">Save</button>
        </div>
        <div v-else>
            <button
                class="py-4 w-full px-6 border border-dashed border-grey-light bg-white"
                @click.prevent="addField = true">
                <i class="fa fa-plus text-xs"></i>Add Field
            </button>
        </div>
    </div>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: ['fieldset'],
        data() {
            return {
                addField: false,
                fieldKey: '',
                field: false
            }
        },
        watch: {
            fieldKey(val) {
                if ( val !== '' ) {
                    this.field = this.fields[val]
                } else {
                    this.field = false
                }
            }
        },
        methods: {
            ...mapActions({
                addSurveyFieldsetRow: 'resources/addSurveyFieldsetRow'
            }),
            saveRow() {
                this.$axios.post(`orgs/${this.survey.org_id}/surveys/${this.survey.id}/fieldsets/${this.fieldset.id}/rows`, {
                    field: this.field,
                    order: this.fieldset.rows.length + 1,
                })
                    .then( response => {
                        this.addSurveyFieldsetRow({
                            fieldset: this.fieldset,
                            row: response.data.data
                        })
                        this.field = false
                        this.fieldKey = ''
                        this.addField = false
                        this.$emit('close')
                    })
            }
        },
        computed: {
            ...mapGetters({
                fields: 'resources/fields',
                survey: 'resources/survey',
            })
        }
    }
</script>
