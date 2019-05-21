<template>
    <div class="container">
        <row>
            <ul>
                <li v-for="(sandbox, index) in sandboxes" :key="index">
                    <a @click="openSandbox(sandbox)" href="#">{{sandbox.domain}}</a>
                    <button @click="removeSandbox(index)">X</button>
                </li>
            </ul>
        </row>
        <row>
            <l-input type="text" id="host" placeholder="Sandbox Domain" v-model="domain"/>
        </row>
        <row>
            <l-input type="text" placeholder="Username" v-model="login"/>
        </row>
        <row>
            <l-input type="password" placeholder="Password" v-model="password"/>
        </row>
        <l-button @click="addSandbox">Add</l-button>
    </div>
</template>

<script>
    export default {
        name: 'Popup',
        data: () => ({
            sandboxes: localStorage.sandboxes ? JSON.parse(localStorage.sandboxes) : [],
            domain: '',
            login: '',
            password: ''
        }),
        methods: {
            addSandbox() {
                this.sandboxes.push({
                    domain: this.domain,
                    login: this.login,
                    password: this.password
                });
                this.save();
                this.clearForm();
            },
            removeSandbox(index) {
                this.sandboxes.splice(index, 1);
                this.save();
            },
            clearForm() {
                this.login = this.domain = this.password = '';
            },
            save() {
                localStorage.sandboxes = JSON.stringify(this.sandboxes);
            },
            openSandbox(sandbox) {
                chrome.tabs.create({url: `/app.html?domain=${sandbox.domain}`});
            }
        },
    }
</script>

<style lang="scss">
    @import '../css/variables.scss';
    @import '../css/fontawesome.css';
    @import '../css/fa-regular.css';
    @import url('https://fonts.googleapis.com/css?family=Lato');

    .container {
        padding: 15px;
        width: 400px;
        font-size: $font-size-base;
        //font-family: 'Lato', sans-serif;

        label {
            display: block;
            line-height: 40px;
            text-align: right;
            padding: 0 15px;
        }
    }
</style>