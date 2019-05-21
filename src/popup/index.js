import Vue from 'vue';
import popup from './popup.vue';
import '../components';

new Vue({
    el: "#root",
    render: h => h(popup)
});
