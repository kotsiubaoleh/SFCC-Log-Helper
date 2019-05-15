<template>
    <div class="container">
        <div clas="content">
            <log-list v-bind:logs="data.logs"/>
        </div>
    </div>
</template>

<script>
    import { data } from './js/store';
    import logList from './components/log-list.vue';
    import mainMenu from './components/main-menu.vue';

    export default {
        name: 'App',
        data: () => ({
            data,
            isTurnedOn: true
        }),
        components:{
            logList,
            mainMenu
        }
    }
</script>

<style lang="scss">
    @import './css/variables.scss';
    @import './css/fontawesome.css';
    @import './css/fa-regular.css';
    @import url('https://fonts.googleapis.com/css?family=Lato');

    body {
        margin: 0px;
        //font-family: 'Lato', sans-serif;
    }

    .raw-log {
        word-wrap: break-word;
        white-space: pre-wrap;
    }
</style>