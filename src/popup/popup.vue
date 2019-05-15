<template>
    <div class="container">
        <ul>
            <li v-for="(sandbox, index) in sandboxes" :key="index">
                <a href="#">{{sandbox.domain}}</a>
                <button @click="removeSandbox(index)">X</button>
            </li>
        </ul>
        <label for="host">Sandbox Domain:</label>
        <input type="text" id="host" v-model="domain">
        <label for="login">Username:</label>
        <input type="text" v-model="login">
        <label for="password">Password:</label>
        <input type="password" v-model="password">
        <button @click="addSandbox">Add</button>
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
            addSandbox: function() {
                this.sandboxes.push({
                    domain: this.domain,
                    login: this.login,
                    password: this.password
                });
                this.save();
            },
            removeSandbox: function(index) {
                this.sandboxes.splice(index, 1);
                this.save();
            },
            save: function() {
                localStorage.sandboxes = JSON.stringify(this.sandboxes);
            }
        },
    }
</script>

<style lang="scss">
    @import '../css/variables.scss';
    @import '../css/fontawesome.css';
    @import '../css/fa-regular.css';
    @import url('https://fonts.googleapis.com/css?family=Lato');

    body {
        margin: 0px;
        //font-family: 'Lato', sans-serif;
    }
</style>