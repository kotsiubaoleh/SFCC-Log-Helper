<template>
    <div class="sandbox-list-view ">
        <h1 v-if="sandboxes.length > 0">Select a sandbox:</h1>
        <h1  v-else >There are no sandboxes saved</h1>
        <transition-group tag="ul" name="fade" class="sandboxes-list">
            <li class="sandbox-list-item" v-for="(sandbox, index) in sandboxes" :key="index" >
                <a class="link" @click.prevent="$emit('open-sandbox', index)" href="#">{{sandbox.name}}</a>
                <span class="item-controls">
                    <base-button
                        @click="$emit('edit-sandbox', index)"
                        icon="edit"
                        type="text"
                        size="large"
                    />
                    <base-button
                        @click="$emit('remove-sandbox', index)"
                        icon="trash-alt"
                        type="text"
                        size="large"
                    />
                </span>
            </li>
        </transition-group>
        <div class="controls">
            <base-button
                class='add-button'
                @click="$emit('add-sandbox')"
            >
                Add new sandbox
            </base-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sandboxes: Array
    }
}
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    $item-height: 50px;

    .sandbox-list-view {
        h1 {
            margin-bottom: 15px;
            text-align: center;
        }

        .controls {
            display: flex;
            margin-top: 15px;
            justify-content: center;
        }
    }

    .sandboxes-list {
        position: relative;
        list-style: none;
        max-height: 5000px;
        margin: 0;
        padding: 0;
        width: 100%;

        .sandbox-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: $item-height;
            border-bottom: 1px solid color("border");
            width: 100%;
            transition: border-color, background-color 0.2s;

            &.fade-move {
                transition: transform 0.2s;
            }

            &.fade-leave-active {
                transition: height 0.2s;

                .item-controls {
                    transition: opacity 0.2s;
                }
            }

            &.fade-leave-to {
                height: 0;

                .item-controls {
                    opacity: 0;
                }
            }

            .link {
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 15px;
                height: 100%;
                width: 100%;
                flex-grow: 2;
                line-height: $item-height;
                font-size: map-get($font-size,  "base");
                text-decoration: none;
                color: color("text");
            }
            

            .item-controls {
                display: none;
            }

            &:hover {
                border-color: color("active-border");
                background-color: color("active-background");

                .link {
                    color: color("active-text");
                }
                .item-controls {
                    display: flex;
                }
            }
        }
    }
</style>
