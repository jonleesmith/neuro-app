
import Vue from 'vue'
import Form from './form'

const Forms = {
	install(Vue, options) {
		Vue.prototype.$forms = {
			create(fields) {
				return new Form(fields)
			}
		}
	}
}

Vue.use(Forms)
