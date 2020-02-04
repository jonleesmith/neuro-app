
import Vue from 'vue'
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
		Vue.mixin({
			computed: {
                ...mapState({
                    sites: 'getSites',
                    site: 'getSite',
                    authenticated: 'auth/loggedIn',
                    user: 'auth/user',
                })
			}
		})
	}
}

Vue.use(Globals)
