import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'normalize.css';

Vue.use(HighchartsVue);
Vue.config.productionTip = false;

const vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

export default vue;
