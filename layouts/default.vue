<template>
	<div class="wrapper">
        <AppNotifications></AppNotifications>
         <div class="app relative flex min-h-screen">
            <div class="bg-gray-900 w-1/5">
              <AppNav></AppNav>
            </div>
            <div class="app-content w-4/5">
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
