<template>
    <portal to="modals">
        <AppModal v-show="open" @close="closeModal">
            <template slot="title">Create {{ resource }}</template>
            <form slot="content" @submit.prevent="saveResource">
                <ResourceForm :schema="schema" :form="form" v-if="form"></ResourceForm>
                <div class="form-row-submit setting">
                    <button type="submit" class="btn text-white bg-green">
                        <span>Save &rarr;</span>
                    </button>
                </div>
            </form>
        </AppModal>
    </portal>
</template>
<script>

    import ResourceForm from '~/components/Resource/Form'

    import { mapActions } from 'vuex'

    export default {
        props: ['open', 'schema', 'resource', 'url'],
        components: {
            ResourceForm
        },
        data() {
            return {
                form: false,
            }
        },
        mounted() {
            let model = {}
            this.schema.forEach(item => {
                model[item.handle] = item.model || ''
            })
            this.form = this.$forms.create(model)
        },
        methods: {
            ...mapActions({
                updateCache: 'resources/cacheState'
            }),
            closeModal() {
                this.$emit('close')
            },
            saveResource() {
                this.$axios.post(this.url, this.form.fields)
                    .then( res => {
                        this.$emit(`created`, res.data.data)
                        this.updateCache({ resource: this.resource })
                        this.$emit('close')
                    })
                    .catch( err => {
                        this.form.setErrors(err.response.data.errors)
                    })
            }
        },
    }
</script>
