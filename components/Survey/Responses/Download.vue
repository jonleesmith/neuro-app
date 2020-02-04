<template>
    <div class="action action__download">
        <a href="" @click.prevent="downloadResponses">
            <div class="icon"><i class="fa fa-download"></i></div>
            <span v-if="working">Working...</span>
            <span v-else>Download</span>
        </a>
    </div>
</template>
<script>
    export default {
        props: ['survey'],
        data() {
            return {
                download: false,
                working: false,
                invitation: {},
                url: '',
            }
        },
        mounted() {
            // this.downloadResponses()
        },
        methods: {
            downloadResponses() {
                this.working = true
                this.$axios.get(`orgs/${this.user.org.id}/surveys/${this.survey.id}/download`)
                    .then( response => {
                        const blob = new Blob([response.data.data]);
                        if ( typeof window.navigator.msSaveBlob !== 'undefined' )
                        {
                            // IE workaround
                            window.navigator.msSaveBlob(blob, this.fileName);
                        }
                        else
                        {
                            const url = window.URL.createObjectURL(blob)
                            const link = document.createElement('a')
                            link.href = url
                            link.setAttribute('download', this.fileName)
                            document.body.appendChild(link)
                            link.click()
                            this.working = false
                        }

                    })
            }
        },
        computed: {
            fileName() {
                return this.survey.name.toLowerCase().replace(/ /g, '-') + '.csv'
            }
        }
    }
</script>
