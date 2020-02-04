<template>
    <portal to="modals">
        <AppModal v-show="open" @close="closeModal" :large="true">
            <p slot="title">Import Responses</p>
            <template slot="content">
                <ToolImport
                    v-if="stage == 'import'"
                    :fields="importFields"
                    @success="getData"
                    @close="open = false"
                    :open="open">
                </ToolImport>
                <div v-if="stage == 'saving'" class="p-8 text-center">
                    <span class="text-2xl" v-if="complete">
                        Done <i class="fa fa-check-circle text-green"></i>
                    </span>
                    <span class="text-2xl" v-else>Saving... <i class="fa text-lg fa-spinner"></i></span>
                </div>
            </template>
        </AppModal>
    </portal>
</template>
<script>

    import ToolImport from '~/components/Tools/Import'

    import { mapGetters } from 'vuex'
    import moment from 'moment'

    export default {
        components: {
            ToolImport
        },
        props: ['open'],
        data() {
            return {
                stage: 'import',
                complete: false,
                error: false,
                parsedCSV: '',
                results: [],
            }
        },
        methods: {
            closeModal() {
                this.$emit('close')
            },
            getData(results) {
                this.stage = 'saving'

                this.$axios.post(`orgs/${this.user.org.id}/surveys/${this.survey.id}/responses`, {
                    responses: this.transformResults(results)
                })
                .then( res => {
                    this.complete = true
                    setTimeout( () => {
                        this.stage = 'import'
                        this.$emit('close')
                    }, 1500)
                })
            },
            transformResults(results)
            {
                let responses = []

                for ( let i = 0; i < results.length; i++ )
                {

                    let result = results[i]

                    let { completed_date } = result

                    delete result.completed_date

                    responses.push({
                        org_id: this.survey.org_id,
                        completed_date: moment(completed_date, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss'),
                        fields: result
                    })

                }
                return responses
            },
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
                surveyFields: 'resources/surveyFields',
            }),
            importFields() {
                let field = {
                    id: 0,
                    name: 'Completed Date',
                    handle: 'completed_date',
                }
                return [ ...this.surveyFields, field ]
            }
        }
    }
</script>
