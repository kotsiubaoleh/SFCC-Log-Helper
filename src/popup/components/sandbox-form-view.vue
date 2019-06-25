<template>
    <div class="sandbox-form-view">
        <base-form ref="form" @submit.prevent="state === 'editing' ? saveChanges : addSandbox">
            <div class="state-title">
                <template v-if="state === 'adding'">
                    Adding new sandbox:
                </template>
                <template v-if="state === 'editing'">
                    Editing sandbox:
                </template>
            </div>
            <base-input
                type="text"
                id="host"
                placeholder="Name"
                v-model="name"
                validation="required"
            />
            <base-input
                type="text"
                id="host"
                placeholder="Sandbox Domain"
                v-model="domain"
                validation="required"
            />
            <base-input
                type="text"
                placeholder="Username"
                v-model="login"
                validation="required"
            />
            <base-input
                type="password"
                placeholder="Password"
                v-model="password"
                validation="required"
            />
            <div class="controls">
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
            </div>
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

<style lang="scss">
    .sandbox-form-view {
        .state-title {
            margin-bottom: 15px
        }

        .controls {
            display: flex;
            margin-top: 15px;
            justify-content: space-around;
        }

        .base-input:not(:last-child) {
            margin-bottom: 15px;
        }
    }
</style>
