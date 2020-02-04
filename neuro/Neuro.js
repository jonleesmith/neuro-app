
import axios from 'axios'

import Container from './Container';

export default function (factory) {

    return function (store) {
        Container.register(factory);
        factory.start(store);
    }

}
