<template>
    <portal to="modals">
        <AppModal v-show="open" @close="closeModal" :large="true">
            <p slot="title">Import</p>
            <div slot="content">
                <ImportTool
                    v-show="stage == 'import'"
                    :fields="importFields"
                    @success="getData"
                    @close="closeModal"
                    :open="open">
                </ImportTool>
                <ImportPreview
                    v-if="stage == 'preview'"
                    @close="closeModal"
                    @cancel="preview = false"
                    @confirm="saveRows"
                    :rows="rows">
                </ImportPreview>
                <div v-if="stage == 'saving'" class="p-8 text-center">
                    <span class="text-4xl" v-if="complete">
                        Done <i class="fa fa-check-circle text-green"></i>
                    </span>
                    <span class="text-4xl" v-else>Saving... <i class="fa fa-spinner"></i></span>
                </div>
            </div>
        </AppModal>
    </portal>
</template>
<script>

    import ImportPreview from '~/components/Tools/ImportPreview'
    import ImportTool from '~/components/Tools/Import'

    export default {
        components: {
            ImportPreview,
            ImportTool
        },
        props: ['open', 'url'],
        data() {
            return {
                stage: 'import',
                complete: false,
                rows: [],
            }
        },
        methods: {
            closeModal() {
                this.stage = 'import'
                this.$emit('close')
            },
            getData(rows) {
                this.stage = 'preview'
                this.rows = rows
            },
            saveRows() {
                this.stage = 'saving'
                this.$axios.post(this.url, {
                    rows: this.rows
                }).then( r => {
                    this.complete = true
                    setTimeout( () => {
                        this.$emit('close')
                    }, 1000 )
                }).catch( err => {
                    throw err
                })
            }
        },
        computed: {
            importFields() {
                let fields = [
                    {
                        id: 1,
                        name: 'Name',
                        handle: 'name',
                    },
                    {
                        id: 2,
                        name: 'Email',
                        handle: 'handle',
                    },
                    {
                        id: 3,
                        name: 'SRA ID',
                        handle: 'uuid',
                    },
                ]
                return fields
            }
        }
    }
</script>
