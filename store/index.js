
// import ElementFactory from '~/neuro/ElementFactory'
// import Neuro from '~/neuro/Neuro'
// import User from '~/elements/User'
// import Collection from '~/elements/Collection'

// export const plugins = [
//     Neuro(db),
// ]

export const state = () => ({
	errors: null,
    appUrl: '',
    project: {
        id: 1,
        name: 'l8r',
        handle: 'later',
    },
    projects: []
})

export const getters = {
    getSite: (state) => state.site,
    getSites: (state) => state.sites,
	getErrors: (state) => state.errors,
    getAppUrl: (state) => state.appUrl
}

export const mutations = {
    SET_ACTIVE_SITE({ state }) {
        state.site = site
    },
    SET_SITES({ state }, payload) {
        state.sites = payload
    }
}

export const actions = {
   async nuxtServerInit({ dispatch }, i) {
        console.log(i)
        await dispatch('fetchSites')
    },
    setActiveSite( { commit }, payload ) {
        commit('SET_SITE', payload)
    },
    fetchSites (  ) {
        return new Promise()
    },
    setSites ( { commit }, payload ) {
        commit('SET_SITES', payload)
    }
}
