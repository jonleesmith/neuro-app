
import Container from './Container'

export default class Model {

    fields() {
        return {};
    }

    namespace(method) {
        return `neuro/collections/${method}`
    }

    store() {
        return Container.factory.$store
    }

    static models() {
        return Container.factory.models()
    }

    static model(element) {
        return this.models()[element]
    }

    getters(method) {
        return this.store().getters[this.namespace(method)];
    }

    /**
     * Dispatch Vuex Action.
     */
    static dispatch(method, payload) {
        return this.store().dispatch(this.namespace(method), payload);
    };

    /**
     * Commit Vuex Mutation.
     */
    static commit(callback) {
        this.store().commit("neuro/$mutate", {
            element: this.element,
            callback: callback
        });
    }

    /**
     * Get all records.
     */
    all() {
        return this.getters('all')();
    }

    /**
     * Find a record.
     */
    static find(id) {
        return this.getters('find')(id);
    }

    /**
     * Get the record of the given array of ids.
     */
    static findIn(idList) {
        return this.getters('findIn')(idList);
    }

    /**
     * Get query instance.
     */
    static query() {
        return this.getters('query')();
    }

    /**
     * Create new data with all fields filled by default values.
     */
    static new() {
        return this.dispatch('new');
    }

    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    static create(payload) {
        return this.dispatch('create', payload);
    }

    /**
     * Insert records.
     */
    static insert(payload) {
        return this.dispatch('insert', payload);
    }

    /**
     * Update records.
     */
    static update(payload) {
        return this.dispatch('update', payload);
    }

    /**
     * Insert or update records.
     */
    static insertOrUpdate(payload) {
        return this.dispatch('insertOrUpdate', payload);
    }

    /**
     * Delete records that matches the given condition.
     */
    static delete(payload) {
        return this.dispatch('delete', payload);
    }

    /**
     * Delete all records.
     */
    static deleteAll() {
        return this.dispatch('deleteAll');
    }

    static getElementActions() {
        return []
    }

}
