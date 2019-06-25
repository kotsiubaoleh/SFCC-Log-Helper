import Vue from 'vue';
import app from './app.vue';
import '@app/components';

new Vue({
    el: "#root",
    render: h => h(app)
});