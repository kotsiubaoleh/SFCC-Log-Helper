<template>
    <div class="log-list">
        <log-record v-for="(log, i) in logs"
            :key="i"
            :index="i"
            :log="log"
        />
    </div>
</template>

<script>
import logRecord from './log-record.vue';

export default {
    props: ['logs'],
    components: {
        logRecord
    }
}
</script>

<style>
    .log-list {
        padding-top: 15px;
    }
</style>
