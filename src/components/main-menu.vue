<template>
    <div>
        <button v-on:click="$emit('update:isTurnedOn', !isTurnedOn)">
            {{isTurnedOn ? 'Off' : 'On'}}
        </button>
    </div>
</template>

<script>
export default {
    props: ['isTurnedOn']
}
</script>

<style>
    .menu {
        position:absolute
    }
</style>
