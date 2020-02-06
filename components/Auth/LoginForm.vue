<template>
	<form method="post" action="#" @submit.prevent="submit">
        <div class="mb-8 p-6 bg-red-300 text-red-600" v-if="errors.has('message')">{{ errors.get('message') }}</div>
		<div class="form-row">
			<label for="email" class="label">Email</label>
			<input
				type="text"
				class="input"
				autofocus=""
                autocomplete="email"
                :class="{ 'border-red-500': errors.has('uid') }"
				v-model="form.email">
			<p class="help error" v-if="errors.has('uid')">{{ errors.get('uid') }}</p>
		</div>

		<div class="form-row">
			<label for="password" class="label">Password</label>
			<input
				type="password"
				class="input"
                autocomplete="password"
				:class="{ 'border-red-500': errors.has('password') }"
				v-model="form.password">
			<p class="help error" v-if="errors.has('password')">{{ errors.get('password') }}</p>
		</div>

		<div class="form-row text-right">
              <button class="btn bg-primary text-white hover:bg-green-700 w-full">
                <span v-if="busy">Please wait...</span>
                <span v-else>Login</span>
            </button>
        </div>

        <div class="text-center">
            <nuxt-link class="border-b border-gray-400 hover:border-green-500" :to="{ name: 'auth-forgot-password' }">
                Forgot password?
            </nuxt-link>
        </div>

	</form>
</template>

<script>
	export default {
	  data() {
			return {
                busy: false,
				form: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			async submit () {
                this.busy = true
				try {
                    await this.$auth.login({
                        data: {
                            email: this.form.email.toLowerCase(),
                            password: this.form.password,
                        }
                    })
                    this.$router.replace({
                        name: 'index'
                    })
                } catch (err) {
                    this.busy = false
                }
			}
		}
	}
</script>
<style>
    form {
        @apply w-full bg-white p-12;
        max-width: 530px;
    }
</style>
