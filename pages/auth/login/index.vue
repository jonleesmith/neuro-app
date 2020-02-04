<template>
    <LoginForm></LoginForm>
</template>

<script>

    import LoginForm from '~/components/Auth/LoginForm'

	export default {
        head() {
            return {
                title: 'Login'
            }
        },
        components: {
            LoginForm,
        },
		layout: 'simple',
		middleware: 'guest'
	}
</script>
