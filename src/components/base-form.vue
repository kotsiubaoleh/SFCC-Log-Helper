<template>
    <form action="" @submit.prevent="" novalidate>
        <slot/>
    </form>
</template>

<script>
import Vue from 'vue';

export default {
    methods: {
        forEachChildInput(callback) {
            const baseInput = Vue.component('base-input');
            function traverse(children) {
                for(let child of children) {
                    if (child instanceof baseInput) {
                        if(callback(child)) return;
                    } else {
                        traverse(child.$children);
                    }
                }
            }
            traverse(this.$children);
        },
        validate() {
            let isValid = true;
            this.forEachChildInput((input) => {
                if (!input.validate()) {
                    isValid = false;
                    return true;
                }
            });
            return isValid;
        },
        clear() {
            this.forEachChildInput((input) => {
                input.clear();
            });
        }
    }
}   
</script>

<style lang="scss">
    @import '../styles';
</style>
