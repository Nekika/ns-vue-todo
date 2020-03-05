<template>
    <GridLayout columns="*" rows="*">
        <ListView col="1" row="1" for="todo in list" @itemTap="onTodoTap">
            <v-template>
                <TodoItem :todo="todo"></TodoItem>
            </v-template>
        </ListView>
    </GridLayout>
</template>

<script>
    import {mapGetters} from 'vuex'
    import TodoItem from "./TodoItem"
    import Detail from "./Detail"

    export default {
        name: 'TodoList',
        computed: {
            ...mapGetters({
                list: 'todo/list',
                done: 'todo/done'
            })
        },
        methods: {
            onTodoTap: function (todo) {
                this.$navigateTo(Detail, {
                    props: {
                        todo: this.list[todo.index]
                    }
                }).catch(error => console.log(error))
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
