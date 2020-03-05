<template>
    <GridLayout columns="100, *" :class="todo.done ? 'done' : ''">
        <Label col="0" :text="status"></Label>
        <Label col="1" :text="todo.title"></Label>
    </GridLayout>
</template>

<script>
    export default {
        props: ['todo'],
        computed: {
            status: function () {
                return this.todo.done ? 'Done' : 'Not done';
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
