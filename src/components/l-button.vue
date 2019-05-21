<template>
    <button @click="onClick" class='button'>
        <span><slot></slot></span>
    </button>
</template>

<script>
export default {
    props: {
        type: String
    },
    methods: {
        onClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss">
    .button {
        color: #606266;
        background: #fff;
        border: 1px solid #dcdfe6;
        padding: 12px 20px;
        line-height: 1;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
    }    
</style>
