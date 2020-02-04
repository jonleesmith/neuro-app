
import FormErrors from './errors';
import { assignIn, forIn, keys, pick } from 'lodash';

export default class Form {
    /*
     * Create a new Form instance.
     */
    constructor(fields)
    {
        this.busy = false;
        this.errors = new FormErrors();
        this.initialFields = fields;
        this.model = {};
        this.successful = false;

        assignIn(this.model, fields);

    }

    /*
     * Get the form's fields.
     */
    get fields() {
        let fields = pick(this.model, keys(this.initialFields));

        // Here we unset null fields.
        forIn(fields, function (value, key)
        {
            if (value == null) {
                delete fields[key];
            }
        })

        return fields;
    }

    /*
     * Get the html/css class for the given field.
     */
    fieldClass(field) {
        return this.errors.has(field) ? 'has-error' : false;
    }

    /*
     * Finish processing the form.
     */
    finishProcessing() {
        this.busy = false;
        this.successful = true;
    }

    /*
     * Completely reset the form.
     */
    reset() {
        this.resetFields();
        this.resetStatus();
    }

    /*
     * Reset the fields to their initial state..
     */
    resetFields() {
        keys(this.initialFields).forEach((key) => this.model[key] = this.initialFields[key]);
    }

    /*
     * Reset the errors and other state for the form.
     */
    resetStatus() {
        this.busy = false;
        this.errors.forget();
        this.successful = false;
    }

    /*
     * Set the errors on the form.
     */
    setErrors(res) {
        this.busy = false;
        this.errors.set(res);
    }

    /*
     * Start processing the form.
     */
    send() {
        this.errors.forget();
        this.busy = true;
        this.successful = false;
    }

}
