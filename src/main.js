import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'normalize.css';
import './helpers/animations';

Vue.use(VueHotkey);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
