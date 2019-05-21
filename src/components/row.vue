<template>
    <div class="row" :class="[justify && `justify-${justify}` , align && `align-${align}`]"><slot></slot></div>
</template>

<script>
export default {
    props: {
        justify: {
            type: String
        },
        align: {
            type: String
        }
    }
}
</script>

<style lang="scss">
    .row {
        display: flex;
        margin-bottom: 20px;

        @each $value in (flex-end, center, space-between, space-around, space-evenly) {
            &.justify-#{$value} {
                justify-content: $value;
            }
        }

        @each $value in (flex-end, center, stretch, baseline) {
            &.align-#{$value} {
                align-items: $value;
            }
        }
    }
</style>
