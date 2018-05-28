<template>
    <div class="container">
        <menu class="menu">
            <main-menu v-bind:isTurnedOn.sync="isTurnedOn"/>
        </menu>
        <div clas="content">
            <div v-if="isTurnedOn" class="log-list">
                <log-record v-for="(log, index) in data.logs" v-bind:key="index" v-bind:log="log"/>
            </div>
            <div v-else>
                {{data.rawLog}}
            </div>
        </div>
    </div>
</template>

<script>
    import { data } from './js/store';
    import logRecord from './components/log-record.vue';
    import mainMenu from './components/main-menu.vue';

    export default {
        name: 'App',
        data: () => ({
            data,
            isTurnedOn: true
        }),
        components:{
            logRecord,
            mainMenu
        }
    }
</script>

<style lang="scss">
    $menu-height: 60px;

    body {
        margin: 0px;
    }

    .menu {
        background: #fafafa;
        height: $menu-height;
        border-bottom: 1px solid #dde0e8;
        position: fixed;
        top: 0;
        margin: 0;
        width: 100%;
    }

    .log-list {
        margin-top: $menu-height;
        padding-top: 50px;
        background: #dde0e8;
        font-family: "Courier New", Courier, monospace;
    }
</style>