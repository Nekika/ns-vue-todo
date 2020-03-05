<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" @tap="onBackTap"></NavigationButton>
            <Label text="Details"></Label>
            <ActionItem text="Delete" ios.position="right" @tap="onDeleteTap"></ActionItem>
        </ActionBar>
        <StackLayout>
            <Label text="Title"></Label>
            <TextField class="title" v-model="todo.title"></TextField>
            <Label text="Description"></Label>
            <TextField class="description" v-model="todo.description" hint="Add a description"></TextField>
        </StackLayout>
    </Page>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        props: ['todo'],
        methods: {
            ...mapMutations([
               'todos/delete'
            ]),
            onBackTap: function () {
                this.$navigateBack();
            },
            onDeleteTap: function () {
                this['todos/delete'](this.todo);
                this.$navigateBack();
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
