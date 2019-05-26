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
                'Authorization': 'Basic ' + btoa(sandbox.login + ':' + sandbox.password),
                'Depth': 1,
            });
            fetch(`https://${domain}/on/demandware.servlet/webdav/Sites/Logs`, 
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
    @import '../styles';
    @import url('https://fonts.googleapis.com/css?family=Lato');
</style>