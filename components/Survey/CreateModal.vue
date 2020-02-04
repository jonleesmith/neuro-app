<template>
    <portal to="modals">
        <AppModal v-show="open" @close="closeModal">
            <template slot="title">Create Survey</template>
            <form slot="content" @submit.prevent="saveSurvey">
                <div class="form-row">
                    <label for="name">
                        Name
                        <span class="error" v-if="form.errors.has('name')">{{ form.errors.get('name') }}</span>
                    </label>
                    <input type="text" class="input" :class="{ 'input-error': form.errors.has('name') }" v-model="form.model.name">
                    <span class="help">A user friendly way to display the name of the survey.</span>
                </div>
                <div class="form-row">
                    <label for="description">Description</label>
                    <textarea class="textarea" v-model="form.model.description"></textarea>
                    <span class="help">A short description of what this survey is for.</span>
                </div>
                <div class="form-row form-row-submit">
                    <button type="submit" class="btn text-white bg-green">Create Survey &rarr;</button>
                </div>
            </form>
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
