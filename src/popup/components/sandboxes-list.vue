<template>
    <ul class="sandboxes-list">
        <li class="sandbox-list-item" v-for="(sandbox, index) in sandboxes" :key="index" >
            <div class="link-container">
                <a class="link" @click.prevent="openSandbox(sandbox)" href="#">{{sandbox.domain}}</a>
            </div>
            <span class="item-controls">
                <base-button
                    @click="editSandbox(index)"
                    icon="edit"
                    type="text"
                    size="big"
                />
                <base-button
                    @click="removeSandbox(index)"
                    icon="trash-alt"
                    type="text"
                    size="big"
                />
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        sandboxes: Array
    },
    methods: {
        openSandbox(sandbox) {
            chrome.tabs.create({url: `/app.html?domain=${sandbox.domain}`});
        },
        removeSandbox(index) {
            this.$emit('remove-sandbox', index);
        },
        editSandbox(index) {
            this.$emit('edit-sandbox', index);
        }  
    }
}
</script>

<style lang="scss">
    @import '../../styles/variables.scss';

    $item-height: 50px;

    .sandboxes-list {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;

        .sandbox-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: $item-height;
            border-bottom: 1px solid $color-border;
            width: 100%;

            .link-container {
                overflow: hidden;
                text-overflow: ellipsis;

                .link {
                    margin-left: 15px;
                    height: 100%;
                    flex-grow: 2;
                    line-height: $item-height;
                    font-size: $font-size-base;
                    text-decoration: none;
                    color: $color-text;
                }
            }

            .item-controls {
                display: none;
            }

            &:hover {
                border-color: $color-active-border;
                background-color: $color-active-background;

                .link {
                    color: $color-active-text;
                }
                .item-controls {
                    display: flex;
                }
            }
        }
    }
</style>
