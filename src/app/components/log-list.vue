<template>
    <div
        class="log-list"
        @scroll="handleScroll"
    >
        <div 
            class="padding-top"
            :style="{height: paddingTop + 'px'}"
        />
        <log-list-item 
            v-for="(renderEntry, index) in renderEntries"
            :key="renderEntry.index"
            :log="renderEntry.record"
            @click="handleLogItemClick(renderEntry.record)"
            :opened="renderEntry.record === openedLogRecord"
        />
        <div
            class="padding-bottom"
            :style="{height: paddingBottom + 'px'}"
        />
    </div>
</template>

<script>
import logListItem from './log-list-item.vue';

const LOG_ITEM_HEIGHT = 150;

export default {
    props: {
        logRecords: Array
    },
    components: {
        logListItem
    },
    data: () => ({
        openedLogRecord: null,
        renderEntries: [],
        paddingTop: 0,
        paddingBottom: 0
    }),
    methods: {
        handleLogItemClick(logRecord) {
            this.openedLogRecord = logRecord;
        },
        renderList() {
            const scrollTop = this.$el.scrollTop;
            const itemsToSkip = Math.floor(scrollTop / LOG_ITEM_HEIGHT);
            this.paddingTop = itemsToSkip * LOG_ITEM_HEIGHT;
            const itemsToShow = Math.min(Math.ceil(this.$el.clientHeight / LOG_ITEM_HEIGHT) + 1, this.logRecords.length);
            const itemsToPad = this.logRecords.length - itemsToSkip - itemsToShow;
            this.paddingBottom = Math.max(itemsToPad * LOG_ITEM_HEIGHT, 0);
            const records = this.logRecords.slice(itemsToSkip, itemsToSkip + itemsToShow);
            let originalIndex = itemsToSkip;
            this.renderEntries = records.map((record) => ({record, index: originalIndex++}));
        },
        handleScroll() {
            this.renderList();
        }
    },
    mounted() {
        this.$el.style.setProperty('--log-item-height', LOG_ITEM_HEIGHT + 'px');
    },
    watch: {
        logRecords: function() {
            this.renderList();
        }
    }
}
</script>

<style lang="scss">
    @import "~@app/styles/variables";

    .log-list {
        overflow-y: auto;
        width: 100%;

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            border: solid color("border");
            border-width: 0 0 0 1px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: color("border");
        }

        &>* {
            overflow-anchor: none;
        }
    }
</style>
