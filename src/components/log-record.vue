<template>
    <div class="log-container" @click="opened = !opened">
        <div class='cause'>{{log.cause}}</div>
        <div>Entries: {{log.entries.length}}</div>
        <stack-trace v-bind:stack="log.stackTrace"/>
    </div>
</template>

<script>
    import stackTrace from './stack-trace.vue';

    export default {
        props: ['log'],
        data: function (){
            return {opened: false}
        },
        components: {
            'stack-trace': stackTrace
        }
    }
</script>

<style>
    .log-container {
        margin: 20px 40px;
        padding: 20px 30px;
        background: #f9f9f9;
        border-radius: 0px;
        box-shadow: -4px 5px 9px 0px #9e9e9e5c;
        border: 1px solid #e4dede;
    }

    .cause {
        font-size: 14px;
        border-bottom: 1px solid #ded5d5;
        padding-bottom: 10px;
    }
</style>
