<template>
    <div class="section">
        <div class="pb-8 text-right text">
            <button
                @click.prevent="updateUser"
                type="button"
                class="btn bg-green hover:bg-green-dark text-white">
                <i class="fa fa-cog"></i> Update
            </button>
        </div>
        <form class="bg-white rounded-sm shadow">
            <div class="form-row setting">
                <label>Name</label>
                <span class="help">Your name.</span>
                <div class="option flex">
                    <input type="text"
                        class="input"
                        autocomplete="name"
                        v-model="userModel.name" />
                </div>
            </div>
            <div class="form-row setting">
                <label>
                    Username
                    <span class="error" v-if="errors.has('email')">
                        {{ errors.get('email') }}
                    </span>
                </label>
                <span class="help">Your email address.</span>
                <div class="option">
                    <input type="text"
                        class="input"
                        autocomplete="email"
                        v-model="userModel.email"/>
                </div>
            </div>
            <div class="form-row setting">
                <div class="option flex items-center">
                    <div class="md:w-1/2 md:mr-4">
                        <label>
                            Password
                            <span class="error" v-if="errors.has('password')">
                                {{ errors.get('password') }}
                            </span>
                        </label>
                        <span class="help">Your new password.</span>
                        <input type="password"
                            class="input"
                            autocomplete="new-password"
                            v-model="userModel.password" />
                    </div>
                    <div class="md:w-1/2 md:ml-4">
                        <label for="">Password confirm</label>
                        <span class="help">Your new password again.</span>
                        <input type="password"
                            class="input"
                            autocomplete="new-password"
                            v-model="userModel.password_confirmation" />
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex'

    export default {
        head() {
            return {
                title: 'My Account'
            }
        },
        data() {
            return {
                userModel: {},
            }
        },
        mounted() {
            this.userModel = {
                name: this.user.name,
                email: this.user.email,
                password: '',
                password_confirmation: '',
            }
        },
        methods: {
            updateField(field, value) {

            },
            updateUser() {
                this.$axios.put(`orgs/${this.user.org_id}/users/${this.user.id}`, {
                    ...this.userModel,
                    change_password: (this.userModel.password)
                }).then( response => {
                    this.response = response
                })
            },
        },
    }
</script>
