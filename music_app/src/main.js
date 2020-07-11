import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import loading from './common/images/logo.png'
import './common/css/border.css'

fastclick.attach(document.body);

Vue.use(VueLazyload, {
    loading
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
