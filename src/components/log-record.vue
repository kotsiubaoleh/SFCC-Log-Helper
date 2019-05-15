<template>
    <div class="log-container">
        <div>
            <span>{{timestamp}}</span>
            <span>{{log.type}}</span>
            <dir>{{log.message}}</dir>
        </div>
    </div>
</template>

<script>
    import stackTrace from './stack-trace.vue';
    import timeUtils from '../js/util/time';

    export default {
        props: ['log', 'opened', 'index'],
        computed: {
            lastTime: function () {
                const entries = this.log.entries;
                return toTimeString(entries[entries.length - 1].time);
            },
            timestamp: function () {
                const timestamp = this.log.timestamp;
                return timeUtils.isToday(timestamp) ? timeUtils.toTimeString(timestamp) : timeUtils.toDateTimeString(timestamp);
            }
        },
        methods: {

        },
        components: {
            'stack-trace': stackTrace,
        },
        data: function() {
            return {
                openedEntryIndex: -1
            }
        }
    }
</script>

<style lang="scss">
    .log-container {
        margin-bottom: 20px;
    }
</style>
