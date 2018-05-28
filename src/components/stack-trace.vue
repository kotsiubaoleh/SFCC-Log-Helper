<template>
    <div>
        <template v-if="stack.lines">
            <button v-on:click="isShown=!isShown">{{isShown ? 'Hide StackTrace' : 'Show StackTrace'}}</button>
            <transition name="slide">
                <div v-if="isShown" class="stack-trace">
                    {{stack.lines}}
                </div>
            </transition>
        </template>
        <template v-else>
            Stack trace is empty...
        </template>
    </div>
</template>

<script>
export default {
    props: ['stack'],
    data: function (){
        return {
            isShown: false
        }
    }
}
</script>

<style>
    .stack-trace {
        font-size: 10px;
        overflow: hidden;
        max-height: 3000px;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.5s;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        max-height: 0;
    }
</style>
