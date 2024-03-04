<template>
  <div
    class="hc-switch"
    :class="{
      size: size,
      disavled: disabled,
      checked: checked
    }"
    @click="switchValue"
  >
    <input
      type="checkbox"
      class="hc-switch__input"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
      ref="input"
    />
    <div class="hc-switch__core">
      <!-- 显示文本 -->
      <div class="hc-switch__core-inner">
        <span v-if="activeText || inactiveText" class="hc-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="hc-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { SwtichProps, SwtichEmits } from './types.ts'
defineOptions({
  name: 'HcSwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwtichProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwtichEmits>()
const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement>()
const checked = computed(() => {
  return innerValue.value == props.activeValue
})
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}
onMounted(() => {
  input.value!.checked = checked.value
})
watch(checked, (val) => {
  input.value!.checked = val
})
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  }
)
</script>

<style scoped></style>
