<template>
    <Page>
        <ActionBar>
            <Label text="Todos"></Label>
            <ActionItem text="Add" ios.position="right" @tap="onAddTap"></ActionItem>
        </ActionBar>
        <TodoList></TodoList>
    </Page>
</template>

<script>
    import TodoList from './TodoList';
    import AddItem from './AddItem';
    import {mapActions} from 'vuex'
    export default {
        components: { TodoList, AddItem },
        methods: {
            ...mapActions([
                'setError',
                'todo/init',
                'todo/getTodos'
            ]),
            onAddTap: function () {
                this.$navigateTo(AddItem, {
                    props: {
                        todos: this.todos
                    }
                })
                .catch(error => console.log(error))

            }
        },
        created(){
            this['todo/init']()
                .then(() => this['todo/getTodos']())
                .catch(err => this['setError'](err))
        }
    }
</script>

<style lang="scss">
    // Color scheme
    $blue: #3c495e;
    $green: #53ba82;

    Page, TextField, TextView{
        background-color: $blue;
        color: #ffffff;
        ActionBar{
            background-color: $green;
        }
    }
</style>
