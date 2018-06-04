<template>
    <div>
        <template v-if="stack && stack.lines">
            <div class="stack-trace">
                {{stack.lines}}
            </div>
        </template>
        <template v-else>
            Stack trace is empty...
        </template>
    </div>
</template>

<script>
export default {
    props: ['stack']
}
</script>

<style>
    .stack-trace {
        font-size: 10px;
        overflow: hidden;
        max-height: 3000px;
    }
</style>
