import { flatten, has, isEmpty, toArray, isArray } from 'lodash'

export default class Errors
{
    /*
     * Create a new FormErrors instance.
     */
    constructor() {
        this.messages = {};
    }

    /*
     * Get all of the raw errors for the collection.
     */
    all() {
        return this.messages;
    }

    /*
     * Determine if the collection has any errors.
     */
    hasErrors() {
        return !isEmpty(this.messages);
    }

    /*
     * Get all of the errors for the collection in a flat array.
     */
    flatten() {
        return flatten(toArray(this.messages));
    }

    /*
     * Forget all of the errors currently in the collection.
     */
    forget() {
        this.messages = {};
    }

    /*
     * Get the first error for the given field.
     */
    get(field) {

        if ( this.has(field) )
        {
            if ( isArray(this.messages[field]) )
            {
                return this.messages[field][0]
            }
            else
            {
                return this.messages[field]
            }
        }

    }

    /*
     * Determine if the collection has any errors for the given field.
     */
    has(field) {
        return has(this.messages, field);
    }

    /*
     * Set the raw errors for the collection.
     */
    set(errors) {
        if ( typeof errors === 'object' ) {
            this.messages = errors;
        } else {
            this.messages = {
                message: [ 'Something went wrong. Please try again or contact customer support.' ]
            }
        }
    }

}
