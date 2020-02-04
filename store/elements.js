
export const state = () => ({
    controller: {},
    selected: []
})

export const getters = {
    controller: (state) => state.controller,
    elements: (state) => state.elements,
}

export const mutations = {
    SET_CONTROLLER (state, payload) {
        state.controlleer.push(payload)
    },
    SET_ELEMENTS(state, payload) {
        state.elements = payload
    },
}

export const actions = {
    setController ({ commit, dispatch }, payload) {
        commit('SET_CONTROLLER', payload)
    },
    setElements ({ commit, dispatch }, payload) {
        commit('SET_ELEMENTS', payload)
    },
}
