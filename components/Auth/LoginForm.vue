<template>
	<form method="post" action="#" @submit.prevent="submit">
        <div class="mb-8 p-6 bg-red-lightest text-red-darker" v-if="errors.has('message')">{{ errors.get('message') }}</div>
		<div class="form-row">
			<label for="email" class="label">Email</label>
			<input
				type="text"
				class="input"
				autofocus=""
                autocomplete="email"
                :class="{ 'border-red': errors.has('email') }"
				v-model="form.email">
			<p class="help error" v-if="errors.has('email')">{{ errors.get('email') }}</p>
		</div>

		<div class="form-row">
			<label for="password" class="label">Password</label>
			<input
				type="password"
				class="input"
                autocomplete="password"
				:class="{ 'border-red': errors.has('password') }"
				v-model="form.password">
			<p class="help error" v-if="errors.has('password')">{{ errors.get('password') }}</p>
		</div>

		<div class="form-row text-right">
              <button class="btn bg-blue text-white hover:bg-blue-dark w-full">
                <span v-if="busy">Please wait...</span>
                <span v-else>Login</span>
            </button>
        </div>

        <div class="text-center">
            <nuxt-link class="border-b border-blue hover:border-transparent hover:shadow" :to="{ name: 'auth-forgot-password' }">
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
<style lang="scss">
    form {
        width: 500px;
    }
</style>
