
import Container from './Container'

export default class Query {

    constructor(state, element)
    {
        this.state = state[element];
        this.element = element;
        this.model = this.getModel(element);
        return this
    }

    store()
    {
        return Container.factory.$store
    }

    models()
    {
        return Container.factory.models()
    }

    getModel(element)
    {
        return this.models()[element]
    }

    insert(data)
    {
        return this.state.data = data
    }

    all()
    {
        return this.state.data
    }

}
