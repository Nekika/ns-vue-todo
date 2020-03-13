<template>
    <Page>
        <StackLayout>
            <Label text="Add a new todo"></Label>
            <TextField v-model="todo.content" hint="Insert content"></TextField>
            <Button text="Save" :isEnabled="buttonEnabled" @tap="onSaveTap"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data: function(){
            return {
               todo: {
                   content: ''
               }
            }
        },
        computed: {
          buttonEnabled: function () {
              return !!this.todo.content.length
          }
        },
        methods: {
            ...mapActions([
                'todo/addTodo',
                'setError'
            ]),
            onSaveTap: function () {
                this['todo/addTodo'](this.todo)
                    .then(() => this.$navigateBack())
                    .catch(err => this['setError'](err))
            }
        }
    }
</script>

<style lang="scss" scoped>
    TextField{
        placeholder-color: #B0B0B0
    }
</style>
