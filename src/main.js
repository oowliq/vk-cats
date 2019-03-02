import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import VueHotkey from 'v-hotkey';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'normalize.css';
import './helpers/animations';

Vue.use(VueHotkey);
Vue.use(HighchartsVue);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
