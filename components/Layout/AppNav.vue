<template>
	<nav role="navigation" aria-label="Main Navigation">
		<div class="">
			<template v-if="authenticated">
				<div>
                    <div>
                        <nuxt-link :to="{ name: 'index' }" class="dashboard">
                            <i class="fa fa-home"></i><span>Dashboard</span>
                        </nuxt-link>
                    </div>
                    <p class="heading">Content</p>
                    <!-- <div>
                        <nuxt-link :to="{ name: 'entries' }">
                            <i class="fa fa-database"></i><span>All Entries</span>
                        </nuxt-link>
                    </div> -->
                    <p class="heading">Settings</p>
                    <div>
                        <nuxt-link :to="{ name: 'collections' }">
                            <i class="fa fa-copy"></i><span>Collections</span>
                        </nuxt-link>
                    </div>
                    <!--
                    <div>
                        <nuxt-link :to="{ name: 'fields' }">
                            <i class="fa fa-database"></i><span>Fields</span>
                        </nuxt-link>
                    </div>
                    <div>
                        <nuxt-link :to="{ name: 'fieldsets' }">
                            <i class="fa fa-database"></i><span>Fieldsets</span>
                        </nuxt-link>
                    </div>
                    <p class="heading">System</p>
                    <div>
                        <nuxt-link :to="{ name: 'sites' }">
                            <i class="fa fa-sitemap"></i><span>Sites</span>
                        </nuxt-link>
                    </div>
                    <div>
                        <nuxt-link :to="{ name: 'users' }">
                            <i class="fa fa-sitemap"></i><span>Users</span>
                        </nuxt-link>
                    </div>
                    <nuxt-link v-if="!user.is('user')" :to="{ name: 'orgs-id-settings', params: { id: user.org.id } }" class="settings">
                        <i class="fa fa-cog"></i><span>{{ user.org.name }}</span>
                    </nuxt-link>
                    <nuxt-link :to="{ name: 'myaccount' }">
                        <i class="fa fa-user-circle"></i><span>{{ user.name || user.username }}</span>
                    </nuxt-link>
                    <nuxt-link :to="{ name: 'auth-logout' }">
                        <i class="fa fa-sign-out-alt"></i><span>Logout</span>
                    </nuxt-link>-->
				</div>
			</template>
		</div>
	</nav>
</template>

<script>
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
        }
	}
</script>
<style lang="scss">

    // .app-nav {clea

    //     .heading {
    //         @apply text-gray-800 uppercase text-sm mt-4 mb-2;
    //         letter-spacing: 1px;
    //     }

    //     a {
    //         @apply block text-gray-800 py-2;
    //         transition: all .3s ease-in-out;

    //         .fa {
    //             @apply text-gray-800 w-3 mr-3 text-xs;
    //         }

    //         &:hover {
    //             @apply text-gray-900;
    //         }

    //     }

    // }
</style>
