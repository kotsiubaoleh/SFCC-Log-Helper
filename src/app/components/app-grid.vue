<template>
    <div 
        class="app-grid"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
    >
        <div class="top-block">
            <slot name="top-block"/>
        </div>
        <div class="left-block">
            <div
                class="handle"
                @mousedown="handleMouseDown"
            >
            </div>
            <slot name="left-block"/>
        </div>
        <div class="right-block">
            <slot name="right-block"/>
        </div>
        <slot/>
    </div>
</template>

<script>

export default {
    name: 'app-grid',
    date: () => ({
        mousePressed: false
    }),
    methods: {
        handleMouseDown() {
            this.mousePressed = true;
        },
        handleMouseUp() {
            this.mousePressed = false;
        },
        handleMouseMove(event) {
            if (this.mousePressed) {
                this.$el.style.setProperty('--left-width', event.clientX + 'px');
            }
        }
    }

}
</script>

<style lang="scss">
    @import '~@app/styles/variables';

    $resize-handle-width: 2.5px;

    .app-grid {
        --left-width: 400px;
        display: grid;
        grid-template: 0 minmax(0, 1fr) / minmax(200px, var(--left-width)) 1fr;
        grid-template-areas:  
            "top top"
            "left right";
        height: 100vh;
        overflow: auto;
        grid-gap: 1px;
        background: color("border");

        &>div {
            background: white;
        }

        .top-block {
            grid-area: top;
        }

        .left-block {
            grid-area: left;
            position: relative;
            display: flex;
            flex-direction: column;

            .handle {
                position: absolute;
                right: -$resize-handle-width / 2;
                height: 100%;
                width: $resize-handle-width;
                cursor: ew-resize;
                user-select: none;
            }
        }

        .right-block {
            display: flex;
            grid-area: right;
            overflow: hidden;
            height: 100%;
        }
    }
</style>
