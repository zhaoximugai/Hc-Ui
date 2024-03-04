<template>
  <div
    class="hc-collapse-item"
    :class="{
      disabled: disabled
    }"
  >
    <div
      class="hc-collapse-item__header"
      :class="{
        disabled: disabled,
        active: isActive
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right"  class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="hc-collapse-item__wrapper" v-show="isActive">
        <div class="hc-collapse-item__content" :id="`item-header-${name}`" >
          <slot></slot>
        </div>
      </div>
    </Transition> 
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'
import Icon from '../Icon/Icon.vue';
const props = defineProps<CollapseItemProps>()
defineOptions({
  name: 'hc-collapseItem'
})
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
const handleClick = () => {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow='hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow=''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow='hidden'

  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow=''

  }
}

inject
</script>

<style scoped>

</style>
