<template>
    <div class="log-list">
        <log-record v-for="(log, index) in logs" v-bind:key="index" v-bind:log="log"/>
    </div>
</template>

<script>
    import { data } from './js/store';
    import logRecord from './components/log-record.vue';

    export default {
        name: 'App',
        data: () => data,
        components:{
            'log-record': logRecord
        }
    }
</script>

<style>
    html * {
        font-family: "Courier New", Courier, monospace;
    }
</style>