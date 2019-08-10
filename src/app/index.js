import Vue from 'vue';
import app from './app.vue';
import '@app/components';

Vue.config.devtools = true;
Vue.config.performance = true;
window.Vue = Vue;

new Vue({
    el: "#root",
    render: h => h(app)
});