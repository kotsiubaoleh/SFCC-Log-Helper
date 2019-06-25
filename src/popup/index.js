import Vue from 'vue';
import popup from './popup.vue';
import '@app/components';

new Vue({
    el: "#root",
    render: h => h(popup)
});
