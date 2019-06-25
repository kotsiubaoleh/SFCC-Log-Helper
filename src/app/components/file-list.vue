<template>
    <ul class="file-list">
        <file-list-item v-for="(file, index) in processedFiles" :file="file" :key="index"/>
    </ul>
</template>

<script>
import fileListItem from './file-list-item';

export default {
    name: 'file-list',
    components: {
        fileListItem
    },
    props: {
        files: Array
    },
    computed: {
        processedFiles() {
            let processedFiles = this.files.filter(file => {
                let result = true;
                if (!file.name || file.isDirectory) result = false;
                return result;
            });
            processedFiles.sort((fileA, fileB) => fileB.lastModDate - fileA.lastModDate);
            return processedFiles;
        }
    }
}
</script>

<style lang="scss">

    .file-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>
