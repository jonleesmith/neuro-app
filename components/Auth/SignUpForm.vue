<template>
	<form method="" @submit.prevent="submit">
		<div class="form-row">
			<label for="name" class="label">Your Name</label>
			<input
				class="input"
				:class="{ 'error': errors.name }"
				type="text" id="name"
				autofocus=""
				v-model="form.name">
			<p class="help error" v-if="errors.name">{{ errors.name[0] }}</p>
		</div>
		<div class="form-row">
			<label for="email" class="label">Your Email</label>
			<input
				class="input"
				:class="{ 'error': errors.email }"
				type="text"
				v-model="form.email">
			<p class="help error" v-if="errors.email">{{ errors.email[0] }}</p>
		</div>
		<div class="form-row">
			<label for="password" class="label">Choose a password</label>
			<input
				class="input"
				:class="{ 'error': errors.password }"
				id="password"
				type="password"
				v-model="form.password">
			<p class="help error" v-if="errors.password">{{ errors.password[0] }}</p>
		</div>
		<button class="btn bg-green text-white">Sign up</button>
	</form>
</template>

<script>

export default {
	data () {
		return {
			form: {
				email: '',
				name: '',
				password: ''
			}
		}
	},
	methods: {
		async submit () {

			await this.$axios.post('auth/register', this.form)

			// await this.$auth.login({
			// 	data: this.form
			// })

			// this.$router.push({
			// 	name: 'index'
			// })
		}
	}
}

</script>
