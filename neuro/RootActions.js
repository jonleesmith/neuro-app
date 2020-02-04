
export default {

    /**
     * Create new data with all fields filled by default values.
     */
    new(context, payload) {
        var result = { data: {} };
        context.commit('new', Object.assign({}, payload, { result: result }));
        return result.data;
    },

    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    async create(context, payload) {
        return new Promise(function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                result = { data: {} };
                context.commit('create', Object.assign({}, payload, { result: result }));
                return [2 /*return*/, result.data];
            });
        });
    },

    /**
     * Insert given data to the state. Unlike `create`, this method will not
     * remove existing data within the state, but it will update the data
     * with the same primary key.
     */
    insert(context, payload) {
        // TODO = Promisify
        let result = { data: {} }
        context.commit('insert', Object.assign({}, payload, { result: result }));
    },

    /**
     * Update data in the store.
     */
    update(context, payload) {
        let result = { data: {} }
        // TODO = Promisify
        context.commit('update', Object.assign({}, payload, { result: result }));
    },

    /**
     * Insert or update given data to the state. Unlike `insert`, this method
     * will not replace existing data within the state, but it will update only
     * the submitted data with the same primary key.
     */
    insertOrUpdate(context, payload) {
        // TODO = Promisify
        let result = { data: {} }
        context.commit('insertOrUpdate', Object.assign({}, payload, { result: result }));
    },

    /**
     * Delete data from the store.
     */
    delete(context, payload) {
        let result = { data: {} }
        context.commit('delete', Object.assign({}, payload, { result: result }));
    },

    /**
     * Delete all data from the store.
     */
    deleteAll(context, payload) {

        if ( payload && payload.entity )
        {
            context.commit('deleteAll', { entity: payload.entity });
            return
        }

        context.commit('deleteAll');
        return

    }

}
