<template>
    <GridLayout columns="100, *" :class="todo.done ? 'done' : ''">
        <Button col="0" :text="status" @tap="toggle"></Button>
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
        },
        methods: {
            toggle: function () {
                this.todo.done = !this.todo.done
                this.$emit('toggled', this.todo)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
