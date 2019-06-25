<template>
    <div class="file-list-item">
        <div class="row">
            <div class="short-name">{{shortName}}</div>
            <div class="mod-date">{{lastModDate}}</div>
        </div>
        <div class="row">
            <div class="full-name">{{file.name}}</div>
        </div>
    </div>
</template>

<script>
import time from "@app/js/util/time";

const shortNameRegExp = /^(?<shortName>.+?)(?:-blade\d-\d\.mon\.demandware\.net-\d-appserver(:?-\d{8})?\.log|\.log)$/;

export default {
    props: {
        file: Object
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
        }
    }
}
</script>

<style lang="scss">
    @import "~@app/styles/variables";

    .file-list-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 40px;
        padding: 5px 10px;
        border-bottom: 1px solid map-get($color, "border");

        .row {
            display: flex;
            justify-content: space-between;

            .short-name {
                font-size: 18px;
            }

            .full-name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: map-get($color, "text-light")
            }
        }
    }
</style>
