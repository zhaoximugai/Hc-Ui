<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="邮箱" prop="email" >
        <Input  v-model="model.email"  />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input  type="password" v-model="model.password"  />
      </FormItem>
      <FormItem label="test value" prop="test">
        <template #default="{validate}">
          <input type="text" v-model="model.test" @blur="validate" ></input>
        </template>
      </FormItem>
      <div>
        <Button type="primary" @click.prevent="submit">Sumbit</Button>
        <Button @click="reset">Reset</Button>
      </div>
    </Form>

  </div>
</template>

<script setup lang="ts">
import Form from './Form.vue'
import Input from '../Input/Input.vue'
import Button from '../Button/Button.vue';
import FormItem from '../Form/FormItem.vue'
import { reactive, ref } from 'vue'

const formRef=ref()
const submit=async ()=>{
  try {
    await formRef.value.validate()
  }catch (e){

  }
}
const model=reactive({
  email:'',
  password:'',
  test:''
})
const rules={
  email:[{type:'string',required:true,trigger:'blur'}],
  password:[{type:'string',required:true,trigger:'blur'}],
  test:[{type:'string',required:true,trigger:'blur'}]
}
const reset=()=>{
  formRef.value.resetFields()
}
</script>

<style scoped></style>
