import Vue from 'vue';
import Vuex from 'vuex';

import catsModule from './modules/cats.module';
import resultsModule from './modules/results.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cats: {
            namespaced: true,
            ...catsModule,
        },
        results: {
            namespaced: true,
            ...resultsModule,
        },
    },
});
