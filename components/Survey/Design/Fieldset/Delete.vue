<template>
    <button class="text-red-light text-sm ml-4" @click.prevent="deleteFieldset">
        <span class="fa fa-minus-circle"></span>
    </button>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: {
            fieldset: {
                type: Object,
                required: true,
            },
        },
        methods: {
            ...mapActions({
                'deleteSurveyFieldset': 'resources/deleteSurveyFieldset'
            }),
            deleteFieldset() {
                if ( window.confirm('Are you sure you want to delete this fieldset?') )
                {
                    this.$axios.delete(
                        `orgs/${this.user.org.id}/surveys/${this.survey.id}/fieldsets/${this.fieldset.id}`
                    ).then( response => {
                        this.deleteSurveyFieldset({ fieldset: this.fieldset })
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
