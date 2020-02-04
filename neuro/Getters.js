
export default {

    /**
     * Create a new Query instance.
     */
    query(state, _getters, _rootState, rootGetters) {
        return function () {
            return rootGetters["neuro/query"](state.$name);
        }
    },

    /**
     * Get all data of given entity.
     */
    all(state, _getters, _rootState, rootGetters) {
        return function () {
            return rootGetters["neuro/all"](state.$name);
        }
    },
    /**
     * Find a data of the given entity by given id.
     */
    find(state, _getters, _rootState, rootGetters) {
        return function (id) {
            return rootGetters["neuro/find"](state.$name, id);
        }
    },
    /**
     * Find array of data of the given entity by given ids.
     */
    findIn(state, _getters, _rootState, rootGetters) {
        return function (idList) {
            return rootGetters["neuro/findIn"](state.$name, idList);
        }
    }

}
