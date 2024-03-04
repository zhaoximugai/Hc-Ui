<template>
  <div
    class="hc-input"
    :class="{
      [`hc-input--${type}`]: type,
      [`hc-input--${size}`]: size,
      'disabled': disabled,
      'prepend': $slots.prepend,
      'append': $slots.append,
      'prefix': $slots.prefix,
      'suffix': $slots.suffix,
      'focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="hc-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="hc-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="hc-input__prefix">
            <slot name="prefix" />
        </span>
        <input
          class="hc-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          ref="inputRef"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="hc-input__suffix" @click="keepFocus">
            <slot name="suffix" />
            <Icon 
              icon="circle-xmark"
              v-if="showClear"
              class="hc-input__clear"
              @click="clear"
              
              @mousedown.prevent="NOOP"
            />
            <Icon 
              icon="eye"
              v-if="showPasswordArea && passwordVisible"
              class="hc-input__password"
              @click="togglePasswordVisible"
            />
            <Icon 
              icon="eye-slash"
              v-if="showPasswordArea && !passwordVisible"
              class="hc-input__password"
              @click="togglePasswordVisible"
            />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="hc-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="hc-textarea__wrapper"
        v-bind="attrs"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
  </template>
  <script setup lang="ts">
  import { ref, watch, computed, useAttrs, nextTick, inject } from 'vue'
  import type { Ref } from 'vue'
  import type { InputProps, InputEmits } from './types'
  import Icon from '../Icon/Icon.vue'
  import {formItemContextKey} from '@/components/Form/types'

  defineOptions({
    name: 'hc-input',
    inheritAttrs: false
  })
  const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
  const emits = defineEmits<InputEmits>()
  const attrs = useAttrs()
  const innerValue = ref(props.modelValue)
  const isFocus = ref(false)
  const passwordVisible = ref(false)
  const inputRef = ref() as Ref<HTMLInputElement>
  const formItemContext=inject(formItemContextKey)
  const runValidation=(trigger?:string)=>{
    formItemContext?.validate(trigger)
  }
  const showClear = computed(() => 
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
  )
  const showPasswordArea = computed(() => 
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
  )
  const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
  }
  //使用@mousedown.prevent="NOOP"来制止默认事件
  //不然在点击图标的前一秒input会失去焦点，导致inoc图标隐藏
  const NOOP = () => {}
  const keepFocus = async () => {
    await nextTick()
    inputRef.value.focus()
  }
  const handleInput = () => {
    emits('update:modelValue', innerValue.value)
    emits('input', innerValue.value)
    runValidation('input')

  }
  const handleChange = () => {
    emits('change', innerValue.value)
    runValidation('change')

  }
  const handleFocus = (event: FocusEvent) => {
    isFocus.value = true
    emits('focus', event)
  }
  const handleBlur = (event: FocusEvent) => {
    isFocus.value = false
    emits('blur', event)
    runValidation('blur')
  }
  const clear = () => {
    innerValue.value = ''
    emits('update:modelValue', '')
    emits('clear')
    emits('input', '')
    emits('change', '')
  }
  watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
  })
  defineExpose({
    ref: inputRef
  })
  </script>