<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" @tap="onBackTap"></NavigationButton>
            <Label text="Details"></Label>
            <ActionItem text="Delete" ios.position="right" @tap="onDelete"></ActionItem>
        </ActionBar>
        <StackLayout>
            <Label text="Todo"></Label>
            <TextField v-model="todo.content" @textChange="onChange"></TextField>
        </StackLayout>
    </Page>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        props: ['todo'],
        methods: {
            ...mapActions([
                'todo/updateTodo',
                'todo/removeTodo',
                'setError'
            ]),
            onBackTap: function () {
                this.$navigateBack()
            },
            onChange: function () {
                this['todo/updateTodo'](this.todo)
                    .catch(err => this['setError'](err))
            },
            onDelete: function () {
                this['todo/removeTodo'](this.todo)
                    .then(() => this.$navigateBack())
                    .catch(err => this['setError'](err))
            }
        }
    }
</script>

<style lang="scss" scoped>
    // Color scheme
    $gray: #717A89;

    StackLayout{
        width: 90%;
        margin-top: 50px;
    }
    TextField{
        background-color: $gray;
        margin-top: 8px;
    }
</style>
