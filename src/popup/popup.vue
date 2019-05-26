<template>
    <div class="popup-container">
        <template v-if="state === 'listing'">
            <row v-if="sandboxes.length > 0" justify="center">
                <h1>Select a sandbox:</h1>
            </row>
            <row v-else justify="center">
                <h1>There are no sandboxes saved</h1>
            </row>
            <row>
                <sandboxes-list
                    :sandboxes="sandboxes"
                    @remove-sandbox="removeSandbox"
                    @edit-sandbox="editSandbox"
                />
            </row>
            <row class="justify-center">
                <base-button
                    @click="addNewSandbox"
                >
                    Add new Sandbox
                </base-button>
            </row> 
            </row>
        </template>
        <base-form ref="form" v-if="['editing', 'adding'].includes(state)">
            <row v-if="state === 'adding'">
                Adding new sandbox:
            </row>
            <row v-if="state === 'editing'">
                Editing sandbox:
            </row>
            <row>
                <base-input
                    type="text"
                    id="host"
                    placeholder="Sandbox Domain"
                    v-model="domain"
                    ref="domain"
                    validation="required"
                />
            </row>
            <row>
                <base-input
                    type="text"
                    placeholder="Username"
                    v-model="login"
                    ref="login"
                    validation="required"
                />
            </row>
            <row>
                <base-input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    ref="password"
                    validation="required"
                />
            </row>
            <row class="justify-center">
                <base-button
                    @click="addSandbox"
                    icon="plus-square"
                    v-if="state === 'adding'"
                >
                    Add
                </base-button>
                <base-button
                    @click="saveChanges"
                    icon="save"
                    v-if="state === 'editing'"
                >
                    Save
                </base-button>
            </row>
        </base-form>
    </div>
</template>

<script>
    import sandboxesList from './components/sandboxes-list.vue';

    export default {
        name: 'Popup',
        components: {
            'sandboxes-list': sandboxesList
        },
        data: () => ({
            sandboxes: [],
            domain: '',
            login: '',
            password: '',
            state: 'listing',
            selectedSandboxIndex: 0
        }),
        mounted() {
            chrome.storage.sync.get('sandboxes', result => this.sandboxes = result.sandboxes || []);
        },
        methods: {
            addSandbox() {
                if (!this.$refs.form.validate()) {
                    return;
                }
                this.sandboxes.push({
                    domain: this.domain,
                    login: this.login,
                    password: this.password
                });
                this.save();
                this.clearForm();
                this.state='listing';
            },
            addNewSandbox() {
                this.state = 'adding';
            },
            removeSandbox(index) {
                this.sandboxes.splice(index, 1);
                this.save();
            },
            editSandbox(index) {
                this.state = 'editing';
                this.selectedSandboxIndex = index;
                ({login : this.login, domain: this.domain, password: this.password} = this.sandboxes[index]);
            },
            saveChanges() {
                const seletedSandbox = this.sandboxes[this.selectedSandboxIndex];
                seletedSandbox.login = this.login;
                seletedSandbox.domain = this.domain;
                seletedSandbox.password = this.password;
                this.save();
                this.clearForm();
                this.state='listing';
            },
            clearForm() {
                this.login = this.domain = this.password = '';
                this.$refs.form.clear()
            },
            save() {
                chrome.storage.sync.set({sandboxes: this.sandboxes});
            }
        },
    }
</script>

<style lang="scss">
    @import '../styles';

    h1 {
        font-size: $font-size-large;
        margin: 0;
    }

    .popup-container {
        padding: 15px;
        width: 400px;
        font-size: $font-size-base;
        color: $color-text;
        //font-family: 'Lato', sans-serif;

        label {
            display: block;
            line-height: 40px;
            text-align: right;
            padding: 0 15px;
        }
    }
</style>