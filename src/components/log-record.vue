<template>
    <div class="log-container" @click="opened = !opened">
        <div class='cause'>{{log.cause}}</div>
        <div>Entries: {{log.entries.length}}</div>
        <div v-if="opened">{{log.stackTrace.lines}}</div>
    </div>
</template>

<script>
export default {
    props: ['log'],
    data: function (){
        return {opened: false}
    }
}
</script>

<style>
    .log-container {
        margin: 20px 40px;
        padding: 20px 30px;
        background: #f7f7f7;
        color: #3a3a3a;
        border-radius: 10px;
    }

    .cause {
        font-size: 14px;
        border-bottom: 1px solid #ded5d5;
        padding-bottom: 10px;
    }
</style>
