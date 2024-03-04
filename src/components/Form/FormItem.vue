<script lang="ts" setup>
import type { FormItemContext, FormItemProps, FormValidateFailure } from '@/components/Form/types'
import { formContextKey, formItemContextKey } from '@/components/Form/types'
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue'
import { isNil } from 'lodash-es'
import Schema from 'async-validator'

defineOptions({
  name: 'hc-formItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)

const validateStatus = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
})
let initiaValue:any=null
const innerValue = computed((() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
}))
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter(rule => {
      if (!rule.trigger || !trigger) return true
      if (rule.trigger == trigger) {
        return rule.trigger
      }
    })
  } else {
    return []
  }
}
const isRequired=computed(()=>{
  return itemRules.value.some(rule=>rule.required)
})
const validate = (trigger?: any) => {
  if (trigger instanceof Object){
    trigger=trigger.type
  }
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if (triggeredRules.length == 0) {
    return true
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules
    })
    validateStatus.loading = true
    return validator.validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      }).catch((e: FormValidateFailure) => {
        const { errors, fields } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
        return Promise.reject(e)
      }).finally(() => {
        validateStatus.loading = false
      })
  }
}
const clearValidate=()=>{
  validateStatus.state='init'
  validateStatus.loading=false
  validateStatus.errorMsg=''
}
const resetField=()=>{
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])){
    model[props.prop]=initiaValue
  }
}
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}
provide(formItemContextKey, context)
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initiaValue=innerValue.value
  }
})
onUnmounted(() => {
  formContext?.removeField(context)
})
</script>

<template>
  <div :class="{
      'error':validateStatus.state=='error',
      'success':validateStatus.state=='success',
      'loading':validateStatus.loading,
      'required':isRequired
    }"
       class="hc-form-item"
  >
    <label class="hc-form-item__label">
      <slot name="label"></slot>
      {{ label }}
    </label>
    <div class="hc-form-item__content">
      <slot :validate="validate"></slot>
      <div v-if="validateStatus.state=='error'" class="hc-form-item__error-msg">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>