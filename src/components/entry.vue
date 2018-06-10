<template>
    <li class="entry" v-on:click.stop="$emit('open', index)">
        <div v-if="!opened">
            <i class="far fa-clock"></i>
            <span class="entry-time entry-heading">{{timeString}}</span>
            <span class="entry-heading">{{entry.request.method}}</span>
            <span class="entry-heading">{{entry.request.URI}}</span>
        </div>
        <div v-else>
            <div>
                <h3>System</h3>
                <div v-if="entry.system.requestID">
                    Request ID: {{entry.system.requestID}}
                </div>
                <div v-if="entry.system.sessionType">
                    Session Type: {{entry.system.sessionType}}
                </div>
                <div v-if="entry.system.sessionID">
                    Session ID: {{entry.system.sessionID}}
                </div>
                <div v-if="entry.system.customer">
                    Customer: {{entry.system.customer}}
                </div>
                <div v-if="entry.system.login">
                    Login: {{entry.system.login}}
                </div>
                <div v-if="entry.system.serverName">
                    Server Name: {{entry.system.serverName}}
                </div>
                <div v-if="entry.system.serverPort">
                    Server Port: {{entry.system.serverPort}}
                </div>
            </div>
            <div>
                <h3>Request</h3>
                <div v-if="entry.request.URI">
                    URI: {{entry.request.URI}}
                </div>
                <div v-if="entry.request.method">
                    Method: {{entry.request.method}}
                </div>
                <div v-if="entry.request.pathInfo">
                    Path Info: {{entry.request.pathInfo}}
                </div>
                <div v-if="entry.request.queryString">
                    Query String: {{entry.request.queryString}}
                </div>
                <div v-if="entry.request.remoteAddress">
                    Remote Address: {{entry.request.remoteAddress}}
                </div>
            </div>
            <div v-if="entry.params && entry.params.length">
                <h3>Parameters</h3>
                <div v-for="param in entry.params" v-bind:key="param">
                    {{param}}
                </div>
            </div>
            <div v-if="entry.stackTrace.lines">
                <div>Stack Trace</div>
                <stack-trace v-bind:stack="entry.stackTrace"/>
            </div>
            
        </div>
    </li>
</template>

<script>
import { toTimeString } from '../js/util';
import stackTrace from './stack-trace.vue';

export default {
    props: ['entry', 'opened', 'index'],
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
