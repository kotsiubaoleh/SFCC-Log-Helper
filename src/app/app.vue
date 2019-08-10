<template>
    <app-grid>
        <template vslot:top-block>
        </template> 
        <template v-slot:left-block>
            <div class="controls">
                <base-input
                    placeholder="Filter"
                    v-model="searchText"
                />
                <base-button
                    icon="sync"
                    icon-type="fas"
                    type="text"
                    @click="handleFileListReload"
                    :disabled="isFileListLoading"
                />
                <base-button
                    icon="times-circle"
                    type="text"
                    size="large"
                />
            </div>
            <file-list
                :files="logFiles"
                :search-text="searchText"
                :selected-files-names="selectedFilesNames"
                @file-selected="handleFileSelection"
            />
        </template>
        <template v-slot:right-block>
            <log-list :log-records="logRecords"/>
        </template>
    </app-grid>
</template> 

<script>
    import appGrid from './components/app-grid';
    import fileList from './components/file-list';
    import logList from './components/log-list';
    import WebDAVClient from '@app/js/util/webdav';
    import storage from '@app/js/util/storage';
    import parser from '@app/js/parser';

    export default {
        name: 'App',
        data: () => ({
            response: '',
            isFileListLoading: false,
            logFiles: [],
            selectedFilesNames: [],
            searchText: "",
            nextRefreshTimeoutHandle: null,
            content: '',
            logRecords: []
        }),
        components: {
            appGrid,
            fileList,
            logList
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
        },
        methods: {
            async handleFileListReload() {
                this.isFileListLoading = true;
                this.logFiles = await this.client.fetchRootDir();
                this.isFileListLoading = false;
            },
            async handleFileSelection(file) {
                const selectedFileName = file.name;
                const selectedFileNameIndex = this.selectedFilesNames.indexOf(selectedFileName);
                if (selectedFileNameIndex !== -1) {
                    this.selectedFilesNames.splice(selectedFileNameIndex, 1);
                } else {
                    this.selectedFilesNames.push(selectedFileName);
                    this.downloadFile(file);
                }
            },
            async downloadFile(file) {
                const content = await this.client.fetchFileContent(file.path, (downloadedSize) => {
                    this.$set(file, 'downloadedSize', downloadedSize);
                });
                file.logRecords = [];
                for(let logRecord of parser.getLogRecords(content)) {
                    file.logRecords.push(logRecord);
                }
                this.joinLogRecords();
            },
            joinLogRecords() {
                this.logRecords = this.logFiles.reduce((resultArr, file) => {
                    return file.logRecords && file.logRecords.length ? resultArr.concat(file.logRecords) : resultArr;
                }, []);
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles';
    @import url('https://fonts.googleapis.com/css?family=Lato');

    html,body {
        margin: 0;
        padding: 0;
    }

    .controls {
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid color("border");
        padding: 10px 5px;
    }

</style>