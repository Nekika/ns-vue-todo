<template>
    <GridLayout columns="*" rows="*">
        <ListView col="1" row="1" for="todo in list" @itemTap="onTodoTap">
            <v-template>
                <TodoItem :todo="todo" @toggled="onTodoToggled"></TodoItem>
            </v-template>
        </ListView>
    </GridLayout>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import TodoItem from "./TodoItem"
    import Detail from "./Detail"

    export default {
        name: 'TodoList',
        computed: {
            ...mapGetters({
                list: 'todo/list',
                doneTodos: 'todo/done'
            })
        },
        methods: {
            ...mapActions('todo', ['updateTodo', 'save']),
            onTodoTap: function (todo) {
                this.$navigateTo(Detail, {
                    props: {
                        todo: this.list[todo.index]
                    }
                }).catch(error => console.log(error))
            },
            onTodoToggled: function (todo) {
                this.updateTodo(todo)
                    .then(this.save())
                    .catch(err => console.log(err))
            }
        },
        components: { TodoItem, Detail }
    }
</script>

<style lang="scss">
    ListView{
        background-color: #3c495e;
    }
</style>
