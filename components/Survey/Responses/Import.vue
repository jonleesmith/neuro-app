<template>
    <div class="action">
        <a href=""
            :disabled="working"
            @click.prevent="showImportModal = !showImportModal">
            <div class="icon"><i class="fa fa-upload"></i></div>
            <span v-if="working">Working...</span>
            <span v-else>Import Responses</span>
            <SurveyResponsesImportModal :open="showImportModal" @close="showImportModal = false"></SurveyResponsesImportModal>
        </a>
    </div>
</template>
<script>
    import SurveyResponsesImportModal from '~/components/Survey/Responses/ImportModal'
    export default {
        components: {
            SurveyResponsesImportModal
        },
        data() {
            return {
                showImportModal: false,
                working: false
            }
        },
        methods: {
            importResponses() {
                this.working = true
                this.$axios.get(`orgs/${this.user.org.id}/surveys/${this.survey.id}/import`)
                    .then( r => {
                        console.log({ r })
                    })
                    .catch( e => {
                        console.log(e)
                    })
            }
        },
        computed: {
            survey() {
                return this.$store.state.surveys.item
            }
        }
    }
</script>
