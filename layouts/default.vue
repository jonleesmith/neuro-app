<template>
	<div class="wrapper">
        <AppNotifications></AppNotifications>
        <AppHeader></AppHeader>

         <div class="app relative flex min-h-screen">
            <div class="bg-gray-800 min-h-screen pt-8 w-64">
                <AppNav></AppNav>
            </div>
            <div class="app-content w-full pt-8 pl-12 pr-10">
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
