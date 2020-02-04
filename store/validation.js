
import ErrorBag from '~/plugins/forms/errors'

export const state = () => ({
	errors: {},
})

export const getters = {
	errors (state) {
        let bag = new ErrorBag()
		bag.set(state.errors)
        return bag
	}
}

export const mutations = {
	SET_VALIDATION_ERRORS (state, errors) {
		state.errors = errors
	}
}

export const actions = {
	setErrors ({ commit }, errors) {
		commit('SET_VALIDATION_ERRORS', errors)
	},
	clearErrors ({ commit }) {
		commit('SET_VALIDATION_ERRORS', {})
	}
}
