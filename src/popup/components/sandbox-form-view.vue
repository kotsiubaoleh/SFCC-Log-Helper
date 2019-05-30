<template>
    <div>
        <base-form ref="form" @submit.prevent="state === 'editing' ? saveChanges : addSandbox">
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
                    placeholder="Name"
                    v-model="name"
                    validation="required"
                />
            </row>
            <row>
                <base-input
                    type="text"
                    id="host"
                    placeholder="Sandbox Domain"
                    v-model="domain"
                    validation="required"
                />
            </row>
            <row>
                <base-input
                    type="text"
                    placeholder="Username"
                    v-model="login"
                    validation="required"
                />
            </row>
            <row>
                <base-input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    validation="required"
                />
            </row>
            <row class="justify-space-between">
                <base-button
                    @click="cancel"
                >
                    Cancel
                </base-button>
                <base-button
                    submit
                    @click="addSandbox"
                    icon="plus-square"
                    v-if="state === 'adding'"
                >
                    Add
                </base-button>
                <base-button
                    submit
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

export default {
    props: {
        sandbox: Object
    },
    data: () => ({
        state: '',
        name: '',
        domain: '',
        login: '',
        password: '',
    }),
    mounted() {
        if (this.sandbox) {
            ({
                name: this.name,
                domain: this.domain,
                login: this.login,
                password: this.password
            } = this.sandbox);
            this.state = 'editing'
        } else {
            this.state = 'adding'
        }
    },
    methods: {
        addSandbox() {
            if (this.$refs.form.validate()) {
                this.$emit('add-sandbox', this.getSandboxObject())
            }
        },
        saveChanges() {
            if (this.$refs.form.validate()) {
                this.$emit('edit-sandbox', this.getSandboxObject())
            }
        },
        cancel() {
            this.$emit('cancel');
        },
        getSandboxObject() {
            return {
                name: this.name,
                domain: this.domain,
                login: this.login,
                password: this.password
            }
        }
    },
}
</script>

<style>

</style>
