<template>
    <div class="popup-container">
        <transition name="switch-view" mode="out-in">
            <sandbox-list-view 
                v-if="state === 'listing'" 
                :sandboxes="sandboxes"
                @open-sandbox="openSandbox"
                @edit-sandbox="startEditingSandbox"
                @remove-sandbox="removeSandbox"
                @add-sandbox="startAddingSandbox"
            />
            <sandbox-form-view
                v-else
                :sandbox="selectedSandboxIndex !== null ? this.sandboxes[selectedSandboxIndex] : null"
                @add-sandbox="addSandbox"
                @edit-sandbox="editSandbox"
                @cancel="showListing"
            />
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue';
    import sandboxListView from './components/sandbox-list-view.vue';
    import sandboxFormView from './components/sandbox-form-view.vue';

    export default {
        name: 'Popup',
        components: {
            'sandbox-list-view': sandboxListView,
            'sandbox-form-view': sandboxFormView
        },
        data: () => ({
            state: 'listing',
            selectedSandboxIndex: null,
            sandboxes: []
        }),
        mounted() {
            chrome.storage.sync.get('sandboxes', result => this.sandboxes = result.sandboxes || []);
        },
        methods: {
            openSandbox(index) {
                chrome.tabs.create({url: `/app.html?index=${index}`});
            },
            addSandbox(sandbox) {
                this.sandboxes.push(sandbox);
                this.showListing();
            },
            removeSandbox(sandboxIndex) {
                this.sandboxes.splice(sandboxIndex, 1);
            },
            startEditingSandbox(sandboxIndex) {
                this.state = 'editing';
                this.selectedSandboxIndex = sandboxIndex;
            },
            startAddingSandbox() {
                this.selectedSandboxIndex = null;
                this.state = 'adding';
            },
            editSandbox(sandbox) {
                this.sandboxes.splice(this.selectedSandboxIndex, 1, sandbox);
                this.showListing()
            },
            showListing() {
                this.state='listing';
            },
        },
        watch: {
            sandboxes: {
                handler: (sandboxes) => chrome.storage.sync.set({sandboxes}),
                deep: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles';

    .switch-view-enter, .switch-view-leave-to {
        opacity: 0;
    }

    .switch-view-enter-active, .switch-view-leave-active {
        transition: opacity 0.1s;
    }

    h1 {
        font-size: map-get($font-size,  "large");
        margin: 0;
    }

    .popup-container {
        padding: 15px;
        width: 400px;
        font-size: map-get($font-size,  "base");
        color: map-get($color,  "text");

        label {
            display: block;
            line-height: 40px;
            text-align: right;
            padding: 0 15px;
        }
    }
</style>