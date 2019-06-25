<template>
    <div class="side-menu">
        <div class="controls">
            <base-button
                icon="times-circle"
                type="text"
                size="large"
            />
        </div>
        <slot/>
    </div>
</template>

<script>

export default {

}
</script>

<style lang="scss">
    @import '~@app/styles/variables';

    .side-menu {
        width: 400px;
        border-right: 1px solid map-get($color, "border");
        
        .controls {
            display: flex;
            justify-content: flex-end;
            border-bottom: 1px solid map-get($color, "border");
        }
    }
</style>
