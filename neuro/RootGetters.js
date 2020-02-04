
import Query from './Query';

export default {

    /**
     * Create a new Query instance.
     */
    query(state) {
        return function (element) {
            return new Query(state, element);
        }
    },

    /**
     * Get all data of given element.
     */
    all(state) {
        return function (element) {
            return (new Query(state, element)).all();
        }
    },

    /**
     * Find a data of the given element by given id.
     */
    find(state) {
        return function (element, id) {
            return (new Query(state, element)).find(id);
        }
    },

    /**
     * Find a data of the given element by given id.
     */
    findIn(state) {
        return function (element, idList) {
            return (new Query(state, element)).findIn(idList);
        }
    }

}
