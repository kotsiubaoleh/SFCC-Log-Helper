<template>
    <div class="file-list">
        <ul 
            v-if="filteredFiles.length"
        >
            <file-list-item 
                v-for="file in filteredFiles"
                :file="file"
                :key="file.name"
                @click="handleClick(file)"
                :selected="isFileSelected(file)" 
                :currentTime="currentTime"
                :searchText="searchText"
            />
        </ul>
        <div
            v-else-if="files.length"
            class="file-list-message"
        >
            No matches found
        </div>
    </div>
</template>

<script>
import fileListItem from './file-list-item';

const SECOND = 1000;

export default {
    name: 'file-list',
    components: {
        fileListItem
    },
    props: {
        files: Array,
        searchText: String,
        selectedFilesNames: Array
    },
    data: () => ({
        currentTime: new Date(),
        isEmpty: true
    }),
    mounted() {
        this._intervalHandle = setInterval(() => {
            this.currentTime = new Date();
        }, SECOND);
    },
    destroyed() {
        clearInterval(this._intervalHandle);
    },
    computed: {
        filteredFiles() {
            
            // Removing directories from file list
            let filteredFiles = this.files.filter(file => {
                let result = true;
                if (!file.name || file.isDirectory) result = false;
                return result;
            });

            // Sorting by last modified time ascending order
            filteredFiles.sort((fileA, fileB) => fileB.lastModDate - fileA.lastModDate);

            // Filtering by search phrase
            filteredFiles = filteredFiles.filter(file => {
                if (file.name.indexOf(this.searchText) !== -1) {
                    return true;
                } 
                return false;
            });

            return filteredFiles;
        }
    },
    methods: {
        handleClick(file) {
            this.$emit('file-selected', file);
        },
        isFileSelected(file) {
            return this.selectedFilesNames.indexOf(file.name) !== -1;
        }
    }
}
</script>

<style lang="scss">
    @import "~@app/styles/variables";

    .file-list {
        overflow-y: scroll;
        height: 100%;

                
        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            border: solid color("border");
            border-width: 0 0 0 1px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: color("border");
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            .file-list-message {
                text-align: center;
                font-size: map-get($font-size, "large");
                padding: 10px 0;
                border-bottom: 1px solid color("border");
            }
        }
    }
</style>
