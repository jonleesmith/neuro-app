
export default {

    /**
     * Create new data with all fields filled by default values.
     */
    new({ state, dispatch }) {
        let element = state.$name;
        return dispatch("neuro/new", { element }, { root: true });
    },

    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    create({ state, dispatch }, payload) {
        let element = state.$name;
        return dispatch("neuro/create", Object.assign({}, payload, { element }), { root: true });
    },

    /**
     * Insert given data to the state. Unlike `create`, this method will not
     * remove existing data within the state, but it will update the data
     * with the same primary key.
     */
    insert({ state, dispatch } , payload) {
        let element = state.$name;
        return dispatch("neuro/insert", Object.assign({}, payload, { element }), { root: true });
    },

    /**
     * Update data in the store.
     */
    update({ state, dispatch } , payload) {
        let element = state.$name;
        // If the payload is an array, then the payload should be an array of
        // data so let's pass the whole payload as data.
        if ( Array.isArray(payload) )
        {
            return dispatch("neuro/update", { element, data: payload }, { root: true });
        }
        // If the payload doesn't have `data` property, we'll assume that
        // the user has passed the object as the payload so let's define
        // the whole payload as a data.
        if ( payload.data === undefined )
        {
            return dispatch("neuro/update", { element, data: payload }, { root: true });
        }
        // Else destructure the payload and let root action handle it.
        return dispatch("neuro/update", Object.assign({ element }, payload), { root: true });
    },

    /**
     * Insert or update given data to the state. Unlike `insert`, this method
     * will not replace existing data within the state, but it will update only
     * the submitted data with the same primary key.
     */
    insertOrUpdate({ state, dispatch } , payload) {
        let element = state.$name;
        return dispatch("neuro/insertOrUpdate", Object.assign({ element }, payload), { root: true });
    },

    /**
     * Delete data from the store.
     */
    delete({ state, dispatch } , payload) {
        let element = state.$name;
        let where = typeof payload === 'object' ? payload.where : payload;
        return dispatch("neuro/delete", { element, where: where }, { root: true });
    },

    /**
     * Delete all data from the store.
     */
    deleteAll({ state, dispatch }) {
        let element = state.$name;
        return dispatch("neuro/deleteAll", { element }, { root: true });
    }

}
