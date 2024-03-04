<template>
  <form class="hc-form">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import type {
  FormContext,
  FormInstance,
  FormItemContext,
  FormProps,
  FormValidateFailure
} from '@/components/Form/types'
import { formContextKey } from '@/components/Form/types'
import type { ValidateFieldsError } from 'async-validator'

import { provide } from 'vue'

defineOptions({
  name: 'hc-form'
})
const props = defineProps<FormProps>()
const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
  if (field.prop) {
    fields.push(field)
  }
}
const removeField: FormContext['removeField'] = (field) => {
  fields.splice(fields.indexOf(field), 1)
}
const resetFields=(keys:string[]=[])=>{
  const filterArr=keys.length>0?fields.filter(field=>keys.includes(field.prop)):fields
  filterArr.forEach(field=>field.resetField())
}
const clearValidate=(keys:string[]=[])=>{
  const filterArr=keys.length>0?fields.filter(field=>keys.includes(field.prop)):fields
  filterArr.forEach(field=>field.clearValidate())
}
const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length == 0) {
    return true
  }
  return Promise.reject(validationErrors)
}
provide(formContextKey, {
  ...props, addField, removeField
})
defineExpose<FormInstance>({
  validate,
  clearValidate,
  resetFields
})
</script>


<style scoped>

</style>