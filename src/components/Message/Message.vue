<template>
  <Transition :name="transitionName" @afterLeave="destroyComponent" @enter="updateHeight">
    <div
      class="hc-message"
      role="alert"
      :class="{
        [`hc-message--${type}`]: type,
        'is-close': showClose
      }"
      v-show="visible"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="cleaTimer"
      @mouseleave="startTimer"
    >
      <div class="hc-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message"></RenderVnode>
        </slot>
      </div>
      <div class="hc-message__close" v-if="showClose">
        <Icon icon="xmark" @click.stop="visible = false"></Icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { MessageProps } from './types'
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon/Icon.vue'
import { computed, onMounted, ref, watch, nextTick, getCurrentInstance } from 'vue'
import { getLastInstance, getLastBottomOffset } from './method'
import useEventListener from '../../hooks/useEventListener'
defineOptions({
  name:'hc-message'
})

let timer: NodeJS.Timeout

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
  transitionName: 'fade-up'
})

const startTimer = () => {
  if (props.duration == 0) {
    return
  }
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function cleaTimer() {
  clearTimeout(timer)
}

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
// const instance=getCurrentInstance()
// console.log(instance);

//计算偏移高度
//就是div高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => {
  return getLastBottomOffset(props.id)
})
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))
onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code == 'Escape') {
    visible.value = false
  }
}

useEventListener(document, 'keydown', keydown)
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestory()
//   }
// })
function destroyComponent() {
  props.onDestory()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>

<style scoped></style>
