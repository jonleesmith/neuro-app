
import Vue from 'vue'
import { mixin as clickaway } from 'vue-clickaway';

import { mapState, mapActions } from 'vuex'

import AppHeader from '~/components/Layout/AppHeader'
import AppModal from '~/components/Layout/AppModal'
import AppLoading from '~/components/Utils/Loading'
import DropdownSelect from '~/components/Utils/DropdownSelect'

Vue.component('AppHeader', AppHeader)
Vue.component('AppModal', AppModal)
Vue.component('AppLoading', AppLoading)
Vue.component('DropdownSelect', DropdownSelect)

const Globals = {
	install (Vue, options)
	{
        Vue.mixin(clickaway)
		Vue.mixin({
			computed: {
                user() {
                    return this.$store.state.auth.user
                },
                authenticated() {
                    return this.$store.state.auth.loggedIn
                },
                projects() {
                    return this.user.projects
                },
                project() {
                    return this.user.projects[0]
                },
			}
		})
	}
}

Vue.use(Globals)
