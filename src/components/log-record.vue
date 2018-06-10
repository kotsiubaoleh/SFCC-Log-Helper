<template>
    <div class="log-container" @click="$emit('open', index)">
        <div class="title-badge">
            <span>{{log.entries.length}}</span>
            <span>{{log.type}}</span>
            <span><i class="far fa-clock"></i>{{lastTime}}</span>
        </div>
        <div class="cause">{{log.cause}}</div>
        <ul v-show="opened">
            <entry v-for="(entry, i) in log.entries"
                :key="i"
                :index="i"
                :entry="entry"
                :opened="openedEntryIndex === i"
                v-on:open="onEntryOpen"
            />
        </ul>
    </div>
</template>

<script>
    import stackTrace from './stack-trace.vue';
    import entry from './entry.vue';
    import { toTimeString } from '../js/util';

    export default {
        props: ['log', 'opened', 'index'],
        computed: {
            lastTime: function () {
                const entries = this.log.entries;
                return toTimeString(entries[entries.length - 1].time);
            }
        },
        methods: {
            onEntryOpen: function (index) {
                if (index === this.openedEntryIndex) {
                    this.openedEntryIndex = -1;
                } else {
                    this.openedEntryIndex = index;
                }
            }
        },
        components: {
            'stack-trace': stackTrace,
            'entry': entry
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
        position: relative;
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

    .title-badge {
        $color-border: #a92d2d;
        $color-background: #ff4c4c;

        font-size: 11pt;
        color: white;
        padding: 5px 10px;
        font-weight: 800;
        top: -15px;
        border: 2px solid $color-border;
        background: $color-background;
        text-shadow: 0px 2px 0px #7d2f2f;
        position: absolute;
        left: -20px;
        border-radius: 20px;

        span {
            &:not(:first-child) {
                padding-left: 15px;
            }
        }
    }
</style>
1 ERROR 10:56:27.401
Error executing pipeline: COShippingStart
5 ERROR 14:23:51.593

