
import Query from './Query';

export default {
    /**
     * Execute generic mutation. This method is used by `Model.commit` method so
     * that user can commit any state changes easily through models.
     */
    $mutate(state, payload) {
        payload.callback(state[payload.element]);
    },

    /**
     * Create new data with all fields filled by default values.
     */
    new(state, payload) {
        var element = payload.element;
        var result = payload.result;
        result.data = (new Query(state, element)).new();
    },

    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    create(state, payload) {
        var element = payload.element;
        var data = payload.data;
        var options = OptionsBuilder.createPersistOptions(payload);
        var result = payload.result;
        result.data = (new Query(state, element)).create(data, options);
    },

    /**
     * Insert given data to the state. Unlike `create`, this method will not
     * remove existing data within the state, but it will update the data
     * with the same primary key.
     */
    insert(state, payload) {
        var element = payload.element;
        var data = payload.data;
        var options = {}
        var result = payload.result;
        result.data = (new Query(state, element)).insert(data, options);
    },

    /**
     * Update data in the store.
     */
    update(state, payload) {
        var element = payload.element;
        var data = payload.data;
        var where = payload.where || null;
        var options = OptionsBuilder.createPersistOptions(payload);
        var result = payload.result;
        result.data = (new Query(state, element)).update(data, where, options);
    },

    /**
     * Insert or update given data to the state. Unlike `insert`, this method
     * will not replace existing data within the state, but it will update only
     * the submitted data with the same primary key.
     */
    insertOrUpdate(state, payload) {
        var element = payload.element;
        var data = payload.data;
        var options = OptionsBuilder.createPersistOptions(payload);
        var result = payload.result;
        result.data = (new Query(state, element)).insertOrUpdate(data, options);
    },

    /**
     * Delete data from the store.
     */
    delete(state, payload) {
        var element = payload.element;
        var where = payload.where;
        var result = payload.result;
        result.data = (new Query(state, element)).delete(where);
    },

    /**
     * Delete all data from the store.
     */
    deleteAll(state, payload) {
        if (payload && payload.element)
        {
            (new Query(state, payload.element)).deleteAll();
            return;
        }
        Query.deleteAll(state);
    }

}
