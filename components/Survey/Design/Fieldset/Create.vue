<template>
    <div class="w-64 mx-auto">
        <button class="w-full px-6 py-4 bg-grey text-white rounded" @click.prevent="addFieldset">
            <i class="fa fa-plus"></i>Add Fieldset
        </button>
    </div>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                form: this.$forms.create({
                    label: `Fieldset ${this.order}`,
                    order: this.order,
                })
            }
        },
        methods: {
            ...mapActions({
                addSurveyFieldset: 'resources/addSurveyFieldset',
            }),
            addFieldset() {
                this.$axios.post(`orgs/${this.user.org.id}/surveys/${this.survey.id}/fieldsets`, {
                    label: `Fieldset ${this.order}`,
                    order: this.order,
                })
                .then( (response) => {
                    this.addSurveyFieldset({
                        fieldset: response.data.data,
                    })
                })
            }
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey'
            }),
            order() {
                return ( this.survey ) ? this.survey.fieldsets.length + 1 : 1;
            }
        }
    }
</script>
