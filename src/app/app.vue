<template>
    <div class="container">
        <side-menu>
            <file-list :files="logFiles"/>
        </side-menu>
    </div>
</template> 

<script>
    import sideMenu from './components/side-menu';
    import fileList from './components/file-list';
    import WebDAVClient from '../js/util/webdav';
    import storage from '../js/util/storage';

    export default {
        name: 'App',
        data: () => ({
            response: '',
            isTurnedOn: true,
            logFiles: []
        }),
        components: {
            fileList,
            sideMenu
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

    body {
        margin: 0;
    }
</style>