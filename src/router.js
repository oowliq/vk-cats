import Vue from 'vue';
import Router from 'vue-router';

import Start from '@/views/Start.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: { name: 'start' },
        },

        {
            name: 'start',
            path: '/start',
            component: Start,
        },
    ],
});
