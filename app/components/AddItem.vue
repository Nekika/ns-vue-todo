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
    import {mapActions} from 'vuex'
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
            ...mapActions([
                'todo/addTodo',
                'todo/save'
            ]),
            onSaveTap: function () {
                const newTodo = {
                    title: this.title,
                    description: this.description,
                    done: false
                }
                this['todo/addTodo'](newTodo)
                    .then(() => this['todo/save']())
                    .catch(err => console.log(err))
                    .finally(() =>  this.$navigateBack())
            }
        }
    }
</script>

<style lang="scss" scoped>
    TextField{
        placeholder-color: #B0B0B0
    }
</style>
