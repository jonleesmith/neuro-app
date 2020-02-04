<template>
    <portal to="modals">
        <AppModal v-show="open" @close="closeModal">
            <template slot="title">Create New Organisation</template>
            <form slot="content" @submit.prevent="saveSurvey">
                <div class="form-row setting">
                    <label for="name">
                        Name
                        <span class="error" v-if="form.errors.has('name')">{{ form.errors.get('name') }}</span>
                    </label>
                    <span class="help">The name of the organisation.</span>
                    <div class="option">
                        <input type="text" class="input" :class="{ 'input-error': form.errors.has('name') }" v-model="form.model.name">
                    </div>
                </div>
            </form>
            <button slot="footer" type="submit" class="btn text-white bg-green">Save Organisation &rarr;</button>
        </AppModal>
    </portal>
</template>
<script>
    export default {
        props: ['open'],
        data() {
            return {
                form: this.$forms.create({
                    name: '',
                    description: '',
                }),
            }
        },
        methods: {
            closeModal() {
                this.$emit('close')
            },
            saveSurvey() {
                this.$axios.post(`orgs/${this.user.org.id}/surveys`, this.form.fields)
                    .then( res => {
                        this.$router.push({ name: 'surveys-id-design', params: { id: res.data.data.id } })
                        this.$emit('close')
                    })
                    .catch( err => {
                        this.form.setErrors(err.response.data.errors)
                    })
            }
        }
    }
</script>
