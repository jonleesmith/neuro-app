<template>
	<div class="wrapper">
        <AppNotifications></AppNotifications>
        <!-- <AppHeader class="px-10"></AppHeader> -->
        <AppNav></AppNav>
         <div class="app relative flex min-h-screen pt-8">
            <div>

            </div>
            <div class="app-content w-full container mx-auto">
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
