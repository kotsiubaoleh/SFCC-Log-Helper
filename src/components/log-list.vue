<template>
    <div class="log-list">
        <log-record v-for="(log, i) in logs"
            :opened="openedLogIndex === i"
            :key="i"
            :index="i"
            :log="log"
            v-on:open="onOpen"
        />
    </div>
</template>

<script>
import logRecord from './log-record.vue';

export default {
    props: ['logs'],
    components: {
        logRecord
    },
    data: function() {
        return {
            openedLogIndex: -1
        }
    },
    methods: {
        onOpen: function(index) {
            if (index === this.openedLogIndex) {
                this.openedLogIndex = -1;
            } else {
                this.openedLogIndex = index;
            }
        }
    }
}
</script>

<style>
    .log-list {
        padding-top: 15px;
    }
</style>
