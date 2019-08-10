<template>
    <div 
        class="file-list-item"
        :class="[selected ? 'selected' : '']"
        @click="$emit('click')"
    >
        <div
            class="progress-bar"
            :style="{
                width: downloadingProgress + '%'
            }"
        />
        <div class="short-name">
            <transition>
                <div
                    class="selected-mark"
                    v-show="selected"
                >
                    <i class="far fa-eye"/>
                </div>
            </transition>
            <div>{{shortName}}</div>
        </div>
        <div class="badges">
            <div class="badge elapsed-time">{{elapsedTime}}</div>
            <div class="badge size">{{size}}</div>
        </div>
        <div 
            class="full-name"
            v-html="fullNameWithHighlits"
        />
    </div>
</template>

<script>
import time from "@app/js/util/time";

const SIZE_UNITS = ['B', 'KB', 'MB', 'GB'];

const shortNameRegExp = /^(?<shortName>.+?)(?:-blade\d-\d\.mon\.demandware\.net-\d-(?:appserver|migration)(:?-\d{8})?\.log|\.log)$/;

export default {
    props: {
        file: Object,
        selected: Boolean,
        currentTime: Date,
        searchText: String
    },
    computed: {
        shortName() {
            const match = shortNameRegExp.exec(this.file.name);
            if (match) {
                return match.groups.shortName;
            } else {
                return this.file.name;
            }
        },
        lastModDate() {
            return time.toDateTimeString(this.file.lastModDate, false);
        },
        elapsedTime() {
            return `${time.getElapsedTime(this.file.lastModDate, this.currentTime)} ago`;
        },
        fullNameWithHighlits() {
            const fileName = this.file.name;
            if (fileName) {
                return fileName.replace(this.searchText, `<strong>${this.searchText}</strong>`);
            } 
        },
        size() {
            const sizeInBytes = this.file.size;
            for (var i = SIZE_UNITS.length - 1; i >= 0; i--) {
                let unitThreshold = Math.pow(1024, i);
                if (sizeInBytes >= unitThreshold) {
                    return (sizeInBytes / unitThreshold).toFixed(2) + ' ' + SIZE_UNITS[i];
                }
            }
            return '0';
        },
        downloadingProgress() {
            if (this.file.downloadedSize) {
                return Math.round(Math.min(this.file.downloadedSize / this.file.size * 100, 100));
            }
            return 0;
        }
    }
}
</script>

<style lang="scss">
    @import "~@app/styles/variables";

    $selected-mark-width: 25px;

    .file-list-item {
        position: relative;
        display: grid;
        grid-template: 1fr 1fr / 1fr 1fr;
        grid-template-areas:
            "left right"
            "bottom bottom";
        height: 40px;
        padding: 5px 10px;
        border-bottom: 1px solid color("border");
        cursor: pointer;
        transition: color background 0.2s;

        &:hover {
            border-color: color("active-border");
            background-color: color("active-background");

            .short-name {
                color: color("active-text");
            }
        }

        &.selected {

            .short-name {
                color: color("active-text");
            }
        }

        .progress-bar {
            position:absolute;
            top: 0;
            bottom: 0;
            left: 0;
            background: color("selected-background");
            mix-blend-mode: multiply;
        }

        .short-name {
            grid-area: left;
            display: flex;
            justify-content: flex-start;
            font-size: map-get($font-size, "big");

            .selected-mark {
                
                width: $selected-mark-width;

                &.v-enter, &.v-leave-to {
                    opacity: 0;
                    margin-right: -$selected-mark-width;
                }

                &.v-enter-active, &.v-leave-active {
                    transition: all 0.2s;
                }
            }
        }

        .full-name {
            grid-area: bottom;
            color: color("text-light");
        }

        .full-name, .short-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .badges {
            grid-area: right;
            flex-shrink: 0;
            display: flex;
            justify-content: space-around;
            flex-direction: row;

            .badge {
                padding: 3px;
                border: 1px solid color("active-border");
                border-radius: 5px;
                text-align: center;
                color: color("active-text");
            }

            .elapsed-time {
                min-width: 90px;
            }

            .size {
                min-width: 90px;
            }
        }

    }
</style>
