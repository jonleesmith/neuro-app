
import axios from 'axios'

import Getters from './Getters'
import RootGetters from './RootGetters'
import Actions from './Actions'
import RootActions from './RootActions'
import Mutations from './Mutations'
import RootMutations from './RootMutations'

export default class ElementFactory {

    constructor() {
        this.elements = []
    }

    start ( store ) {
        this.version = '1'
        this.$store = store

        this.registerRootModule()
        this.registerElementModules()
    }

    register(model, module) {
        this.elements.push({
            name: model.element,
            model,
            module
        });
    }

    registerRootModule() {
        this.$store.registerModule('neuro', {
            namespaced: true,
            state: {},
            getters: RootGetters,
            actions: RootActions,
            mutations: RootMutations,
        })
    }

    registerElementModules() {
        for ( let i = 0; i < this.elements.length; i++ )
        {
            let element = this.elements[i]
            this.$store.registerModule(['neuro', element.name], {
                namespaced: true,
                state: { $name: element.name, data: [] },
                getters: Getters,
                actions: Actions,
                mutations: Mutations,
                module: true,
            })
        }
    }

    models() {
        return this.elements.reduce( (models, element) => {
            models[element.name] = element.model;
            return models;
        }, {});
    }

}
