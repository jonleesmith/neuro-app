
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

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
                ...mapGetters({
                    sites: 'getSites',
                    site: 'getSite'
                }),
                appUrl()  {
                    return process.env.appUrl
                }
			}
		})
	}
}

Vue.use(Globals)
