import Vue from 'vue';
import app from '../app.vue';
import {init as initStore} from './store'

const logElement = document.body.firstElementChild;
logElement.style.display = 'none';
initStore(logElement.textContent)

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

new Vue({
    el: container,
    render: h => h(app)
});
