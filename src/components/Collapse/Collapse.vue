<template>
  <div class="hc-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
import './style.css'
defineOptions({
  name: 'hc-collapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

const handleItemClick = (item: NameType) => {
  let _activeNmaes = [...activeNames.value]

  if (props.accordion) {
    _activeNmaes = [activeNames.value[0] === item ? '' : item]
    activeNames.value=_activeNmaes
  } else {
    const index = _activeNmaes.indexOf(item)
    if (index > -1) {
      //存在就删除
      _activeNmaes.splice(index, 1)
    } else {
      //不存在就删除
      _activeNmaes.push(item)
    }
    activeNames.value=_activeNmaes
  }
  emits('update:modelValue', _activeNmaes)
  emits('change', _activeNmaes)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style scoped></style>
