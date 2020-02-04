<template>
	<section class="py-10 text-center">
		You have been successfully logged out.
	</section>
</template>

<script>
	export default {
        head() {
            return {
                title: 'Logout'
            }
        },
		middleware: 'auth',
		mounted() {
			this.$auth.logout()
		}
	}
</script>
