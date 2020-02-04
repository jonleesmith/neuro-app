
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
        let element = payload.element;
        let result = payload.result;
        result.data = (new Query(state, element)).new();
    },

    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    create(state, payload) {
        let element = payload.element;
        let data = payload.data;
        let options = {}
        let result = payload.result;
        result.data = (new Query(state, element)).create(data, options);
    },

    /**
     * Insert given data to the state. Unlike `create`, this method will not
     * remove existing data within the state, but it will update the data
     * with the same primary key.
     */
    insert(state, payload) {
        let element = payload.element;
        let data = payload.data;
        let options = OptionsBuilder.createPersistOptions(payload)
        let result = payload.result;
        result.data = (new Query(state, element)).insert(data, options)
    },

    /**
     * Update data in the store.
     */
    update(state, { element, data, where, result }) {
        let options = {}
        result.data = (new Query(state, element)).update(data, where, options)
    },

    /**
     * Insert or update given data to the state. Unlike `insert`, this method
     * will not replace existing data within the state, but it will update only
     * the submitted data with the same primary key.
     */
    insertOrUpdate(state, { element, data, result }) {
        let options = {}
        result.data = (new Query(state, element)).insertOrUpdate(data, options);
    },

    /**
     * Delete data from the store.
     */
    delete(state, { element, where, result }) {
        result.data = (new Query(state, element)).delete(where);
    },

    /**
     * Delete all data from the store.
     */
    deleteAll(state, payload) {
        if ( payload && payload.element )
        {
            (new Query(state, payload.element)).deleteAll();
            return;
        }
        Query.deleteAll(state);
    }

}
