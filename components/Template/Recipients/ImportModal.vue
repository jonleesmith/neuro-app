<template>
    <portal to="modals">
        <AppModal v-show="open" @close="closeModal" :large="true">
            <p slot="title">Import Recipients</p>
        	<template slot="content">
                 <div v-if="preview">
                    <RecipientsImportPreview
                        @close="closeModal"
                        @cancel="preview = false"
                        :survey="survey"
                        :template="template"
                        :csv="results">
                    </RecipientsImportPreview>
                </div>
                <div v-else>
                    <ImportTool :fields="surveyFields" @success="getData" @close="closeModal" :open="open"></ImportTool>
                </div>
            </template>
        </AppModal>
    </portal>
</template>
<script>

    import RecipientsImportPreview from './ImportPreview'
    import ImportTool from '~/components/Tools/Import'

	export default {
		components: {
			RecipientsImportPreview,
            ImportTool
		},
		props: ['open', 'template'],
		data() {
			return {
				preview: false,
				results: [],
			}
		},
		methods: {
            closeModal() {
                this.preview = false
                this.$emit('close')
            },
			getData(results) {
                this.results = results
                this.preview = true
			}
		},
        computed: {
            survey() {
                return this.$store.state.resources.surveys.item
            },
            surveyFields() {
                let rows = []
                let exists = []
                for ( let j = 0; j < this.survey.rows.length; j++ )
                {
                    let row = this.survey.rows[j]
                    if ( exists.indexOf(row.field.id) == -1 )
                    {
                        rows.push(row.field)
                        exists.push(row.field.id)
                    }
                }
                return rows
            }
        }
	}
</script>
