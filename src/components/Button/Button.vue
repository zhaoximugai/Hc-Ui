<template>
  <button
    ref="_ref"
    class="hc-button"
    :style="{width:width+'px',height:height+'px'}"
    :class="{
      [`hc-button--${type}`]: type,
      [`hc-button--${size}`]: size,
      'plain': plain,
      'round': round,
      'circle': circle,
      'disabled': disabled,
      'loading':loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
  <Icon icon="spinner" spin v-if="loading" />
  <Icon :icon="icon"  v-if="icon" />

    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import './style.css'
import type { ButtonProps } from "./types";
import Icon from '../Icon/Icon.vue'
import { ref } from "vue";
defineOptions({
  name: "hc-button",
});
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button", 
});
const _ref = ref<HTMLButtonElement>();

defineExpose({
  ref:_ref
})
</script >

<style >
  
</style>
