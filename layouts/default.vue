<template>
	<div class="wrapper">
        <AppNotifications></AppNotifications>
        <AppHeader class="px-12"></AppHeader>
         <div class="app relative flex min-h-screen bg-gray-300 pt-8">
            <div class="bg-gray-300 w-64">
              <AppNav class="pl-10 pr-6"></AppNav>
            </div>
            <div class="app-content w-full">
                <nuxt />
            </div>
        </div>
        <transition name="fade">
            <portal-target name="modals" multiple></portal-target>
        </transition>
    </div>
</template>

<script>

	import AppNav from '~/components/Layout/AppNav'
	import AppNotifications from '~/components/Layout/AppNotifications'

	export default {
		middleware: 'auth',
		components: {
			AppNav,
			AppNotifications
		}
	}
</script>
