<template>
    <button 
        @click="onClick" 
        class="base-button"
        :type="submit ? 'submit' : 'button'"
        :class="[
            type ? `button-type-${type}` : '',
            size ? `button-size-${size}` : '',
            { circle: circle }
        ]"
    >
        <span>
            <slot></slot>
            <i v-if="icon" :class="`far fa-${icon}`"/>
        </span>
    </button>
</template>

<script>
export default {
    props: {
        submit: Boolean,
        type: String,
        icon: String,
        circle: Boolean,
        size: String
    },
    methods: {
        onClick(e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss">
    @import '../styles';

    .base-button {
        color: map-get($color, "text");
        background: map-get($color,  "background");
        border: 1px solid map-get($color,  "border");
        padding: 12px 20px;
        line-height: 1;
        border-radius: 4px;
        font-size: map-get($font-size, "base");
        cursor: pointer;

        &:focus {
            outline: none;
            border-color: map-get($color, "active-border");
        }

        &:hover {
            color: map-get($color, "active-text");
            border-color: map-get($color, "active-border");
            background-color: map-get($color, "active-background");
        }

        &.circle {
            border-radius: 50%;
            padding: 12px;
        }

        &.button-type-text {
            border: none;
            background-color: transparent;
            padding: 6px 10px;
        }

        &.button-size-large {
            font-size: map-get($font-size,  "large");
        } 
    }
</style>
