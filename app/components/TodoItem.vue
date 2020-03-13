<template>
    <GridLayout columns="100, *" :class="todo.done ? 'done' : ''">
        <Switch col="0" :checked="status" @checkedChange="toggle"></Switch>
        <Label col="1" :text="todo.content"></Label>
    </GridLayout>
</template>

<script>
    export default {
        props: ['todo'],
        computed: {
            status: function () {
                return this.todo.done
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
