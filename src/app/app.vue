<template>
    <div class="container" v-html="response">
        
    </div>
</template>

<script>
    import logList from '../components/log-list.vue';
    import mainMenu from '../components/main-menu.vue';
    import WebDAVClient from '../js/util/webdav';
    import storage from '../js/util/storage';

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
        async mounted() {
            const sandboxIndex = location.search.split('=')[1];
            const sandbox = await storage.getSandbox(sandboxIndex);
            this.client = new WebDAVClient({
                domain: sandbox.domain,
                login: sandbox.login,
                password: sandbox.password
            });
            this.logFiles = await this.client.fetchRootDir();
            console.log(this.logFiles);
        }
    }
</script>

<style lang="scss">
    @import '../styles';
    @import url('https://fonts.googleapis.com/css?family=Lato');
</style>