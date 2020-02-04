<template>
    <button class="text-red-light text-sm ml-4 icon" @click.prevent="deleteFieldsetRow">
        <i class="fa fa-minus-circle"></i>
    </button>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: {
            row: {
                type: Object,
                required: true,
            },
        },
        methods: {
            ...mapActions({
                'deleteSurveyFieldsetRow': 'resources/deleteSurveyFieldsetRow'
            }),
            deleteFieldsetRow() {
                if ( window.confirm('Are you sure you want to delete this field?') )
                {
                    this.$axios.delete(
                        `orgs/${this.user.org.id}/surveys/${this.survey.id}/fieldsets/${this.row.survey_fieldset_id}/rows/${this.row.id}`
                    ).then( response => {
                        this.deleteSurveyFieldsetRow({ row: this.row })
                    })
                }
            },
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey'
            }),
        }
    }
</script>
