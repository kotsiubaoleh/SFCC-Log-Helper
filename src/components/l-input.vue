<template>
    <input class="input" :value="value" @input="handleInput"/>
</template>

<script>
export default {
    props: {
        value: [String, Number]
    },
    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}   
</script>

<style lang="scss">
    @import '../css/variables';

    .input {
        display: inline-block;
        width: 100%;
        vertical-align: bottom;
        font-size: $font-size-base;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
    }
</style>
