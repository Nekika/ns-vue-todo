<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" @tap="onBackTap"></NavigationButton>
            <Label text="Details"></Label>
            <ActionItem text="Delete" ios.position="right" @tap="onDeleteTap"></ActionItem>
        </ActionBar>
        <StackLayout>
            <Label text="Title"></Label>
            <TextField class="title" v-model="todo.title" @textChange="onChange"></TextField>
            <Label text="Description"></Label>
            <TextField class="description" v-model="todo.description" hint="Add a description" @textChange="onChange"></TextField>
        </StackLayout>
    </Page>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        props: ['todo'],
        methods: {
            ...mapActions([
                'todo/removeTodo',
                'todo/updateTodo',
                'todo/save'
            ]),
            onChange: function () {
                this['todo/updateTodo'](this.todo)
                    .then(() => this['todo/save']())
                    .catch(err => console.log(err))
            },
            onBackTap: function () {
                this.$navigateBack()
            },
            onDeleteTap: function () {
                this['todo/removeTodo'](this.todo)
                    .then(() => this['todo/save']())
                    .catch(err => console.log(err))
                    .finally(() => this.$navigateBack())
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
        &.title{
            margin-bottom: 30px;
        }
    }
</style>
