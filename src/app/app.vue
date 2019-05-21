<template>
    <div class="container" v-html="response">
    </div>
</template>

<script>
    import logList from '../components/log-list.vue';
    import mainMenu from '../components/main-menu.vue';

    export default {
        name: 'App',
        data: () => ({
            response: '',
            isTurnedOn: true
        }),
        components: {
            logList,
            mainMenu
        },
        mounted() {
            const domain = location.search.split('=')[1];
            const sandboxes = JSON.parse(localStorage.sandboxes);
            const sandbox = sandboxes.find((sandbox) => sandbox.domain === domain);

            const headers = new Headers({
                'Accept': '*/*',
                'Authorization': 'Basic ' + btoa(sandbox.login + ':' + sandbox.password),
                'Depth': 1,
                'Origin': ''
            });
            fetch(`https://${domain}/on/demandware.servlet/webdav/Sites/Cartridges/o_kotsiuba`, 
                {
                    method: "PROPFIND",
                    headers
                })
                .then(response => response.text())
                .then(responseText => this.response = responseText);
        }
    }
</script>

<style lang="scss">
    @import '../css/variables.scss';
    @import '../css/fontawesome.css';
    @import '../css/fa-regular.css';
    @import url('https://fonts.googleapis.com/css?family=Lato');

    body {
        margin: 0px;
        //font-family: 'Lato', sans-serif;
    }

    .raw-log {
        word-wrap: break-word;
        white-space: pre-wrap;
    }
</style>