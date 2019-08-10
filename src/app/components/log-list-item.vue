<template>
    <div 
        class="log-container"
        :class="[opened && 'opened']"
        @click="$emit('click')"
    >
        <div 
            class="type-indicator"
            :class="'indicator-' + log.type"
        >
            {{log.type}}
        </div>
        <div>{{timestamp}}</div>
        <div class="log-message">{{log.message}}</div>
    </div>
</template>

<script>
    import stackTrace from './stack-trace.vue';
    import timeUtils from '@app/js/util/time';

    export default {
        props: {
            log: Object,
            opened: Boolean,
            index: Number
        },
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
    @import "~@app/styles/variables";

    $vertical-padding: 10px;
    $indicator-width: 20px;

    .log-container {
        position: relative;
        padding: $vertical-padding 30px;
        border-bottom: 1px solid color("border");
        height: var(--log-item-height);
        box-sizing: border-box;

        .log-message {
            font-size: 14px;
        }

        &.opened {
            
        }

        .type-indicator {
            position: absolute;
            left: 5px;
            font-weight: 900;
            color: white;
            writing-mode: vertical-lr;
            text-orientation: upright;
            text-transform: uppercase;
            top: $vertical-padding;
            bottom: $vertical-padding;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 4px;
            width: $indicator-width;
            
            @each $type in ("error", "warn", "debug", "info", "message") {
                &.indicator-#{$type} {
                    background-color: indicator-color($type);
                }
            }
        }
    }
</style>
