<template>
    <div>
        <nav class="app-nav" role="navigation" aria-label="Main Navigation">
            <!-- <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-box text-gray-500 mr-1" style="width: 18px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 feather feather-menu mr-2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                <p class="text-2xl text-gray-200 lowercase font-medium">
                    {{ user || 'Neuro' }}
                </p>
            </div> -->
            <div class="nav">
                <nuxt-link :to="{ name: 'index' }" class="dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span>Dashboard</span>
                </nuxt-link>
                <p class="heading">Content</p>
                <nuxt-link :to="{ name: 'collections' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                    <span>Collections</span>
                </nuxt-link>
                <p class="heading">Settings</p>
                <nuxt-link :to="{ name: 'users' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Users</span>
                </nuxt-link>
                <p class="heading">Account</p>
                <nuxt-link :to="{ name: 'myaccount' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>My Acccount</span>
                </nuxt-link>
                <nuxt-link :to="{ name: 'auth-logout' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span>Logout</span>
                </nuxt-link>
            </div>
        </nav>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

	export default {
        data() {
            return {
                openMenu: false
            }
        },
        methods: {
            optionSelect({ value }) {
                if ( value == 'logout' )
                {
                    this.$router.replace({
                        name: 'auth-logout'
                    })
                }
            }
        },
        computed: {
            ...mapGetters({
                'user' : 'auth/user'
            })
        }
	}
</script>
<style lang="scss">

    .app-nav {

        .heading {
            @apply text-gray-600 uppercase font-medium text-sm mt-4 mb-2 px-10;
            letter-spacing: 1px;
        }

        a {
            @apply block text-gray-500 py-2 flex items-center px-10 text-base;
            transition: all .3s ease-in-out;

            svg {
                @apply text-gray-600 mr-2 text-xs;
                width: 16px;
            }
            
            &:not(.dashboard).nuxt-link-active,
            &:hover {
                @apply text-white;
            }

        }

    }
</style>
