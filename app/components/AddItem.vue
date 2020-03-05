<template>
    <Page>
        <StackLayout>
            <Label text="Add a new todo"></Label>
            <TextField v-model="title" hint="Insert a title"></TextField>
            <TextField v-model="description" hint="Insert a description"></TextField>
            <Button text="Save" :isEnabled="buttonEnabled" @tap="onSaveTap"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        data: function(){
            return {
                title: "",
                description: ""
            }
        },
        computed: {
          buttonEnabled: function () {
              return !!this.title.length
          }
        },
        methods: {
            ...mapMutations([
               'todos/add'
            ]),
            onSaveTap: function () {
                const newTodo = {
                    title: this.title,
                    description: this.description,
                    done: false
                }
                this['todos/add'](newTodo)
                this.$navigateBack()
            }
        }
    }
</script>

<style lang="scss" scoped>
    TextField{
        placeholder-color: #B0B0B0
    }
</style>
