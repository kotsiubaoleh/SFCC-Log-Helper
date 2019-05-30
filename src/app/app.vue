<template>
    <div class="container" v-html="response">
    </div>
</template>

<script>
    import logList from '../components/log-list.vue';
    import mainMenu from '../components/main-menu.vue';
    import XML from '../js/util/xml';

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
            const sandboxIndex = location.search.split('=')[1];
            let sandboxes = chrome.storage.sync.get('sandboxes', (result) => {
                const sandbox = result.sandboxes[sandboxIndex];

                const headers = new Headers({
                    'Authorization': 'Basic ' + btoa(sandbox.login + ':' + sandbox.password),
                    'Depth': 1,
                });
                fetch(`https://${sandbox.domain}/on/demandware.servlet/webdav/Sites/Logs`, 
                    {
                        method: "PROPFIND",
                        headers
                    })
                    .catch(error => console.log(error))
                    .then(response => response.text())
                    .then(responseText => {
                        window.text = responseText;
                        window.xml = new XML(window.text);
                        for (let response of window.xml.multistatus.response) {
                            console.log(response.href.text())
                        }
                    });
            });
        }
    }
</script>

<style lang="scss">
    @import '../styles';
    @import url('https://fonts.googleapis.com/css?family=Lato');
</style>