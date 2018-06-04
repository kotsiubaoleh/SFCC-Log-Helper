<template>
    <li class="entry" v-on:click.stop="closed = !closed">
        <div v-if="closed">
            <i class="far fa-clock"></i>
            <span class="entry-time entry-heading">{{timeString}}</span>
            <span class="entry-heading">{{entry.request.method}}</span>
            <span class="entry-heading">{{entry.request.URI}}</span>
        </div>
        <div v-else>
            <stack-trace v-bind:stack="entry.stackTrace"/>
        </div>
    </li>
</template>

<script>
import { toTimeString } from '../js/util';
import stackTrace from './stack-trace.vue';

export default {
    props: ['entry'],
    data: function () {
        return {
            closed: true
        };
    },
    computed: {
        timeString: function() {
            return toTimeString(this.entry.time);
        }
    },
    components: {
        'stack-trace': stackTrace
    }
}
</script>

<style lang="scss">
    @import '../css/variables.scss';

    .entry {
        list-style: none;
        border-bottom: 1px solid $color-gray;
        margin: 5px;
        padding: 5px;
    }
    
    .entry-time {
        padding-left: 10px;
    }

    .entry-heading {
        padding-right: 20px;
        border-right: 1px solid $color-gray;
    }
</style>
