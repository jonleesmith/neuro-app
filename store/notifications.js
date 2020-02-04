
export const state = () => ({
    messages: [],
})

export const getters = {
    messages (state) {
        return state.messages
    }
}

export const mutations = {
    ADD_MESSAGE (state, message) {
        state.messages.push(message)
    },
    CLEAR_MESSAGES ( state ) {
        state.messages = []
    },
}

export const actions = {
    addMessage ({ commit, dispatch }, message) {
        commit('ADD_MESSAGE', message)
        setTimeout( () => {
            dispatch('clearMessages')
        }, 2000)
    },
    clearMessages ({ commit }) {
        commit('CLEAR_MESSAGES', {})
    }
}
