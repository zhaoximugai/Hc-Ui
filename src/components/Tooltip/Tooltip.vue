<template>
  <div class="hc-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="hc-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div class="hc-tooltip__popper" ref="popperNode" v-if="isOpen">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow"  data-popper-arrow>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted, computed } from 'vue'
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'hc-tooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})

const emits = defineEmits<TooltipEmits>()
const isOpen = ref<boolean>(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers:[
      {
        name:'offset',
        options:{
          offset:[0,9]
        }
      }
    ],
    ...props.popperOptions
  }
})

const togglePopper = (): void => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
  emits('visible-change', isOpen.value)
}
const open = () => {
  isOpen.value = true
  emits('visible-change', true)

}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger == 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside',true)
  }
})
const attachEvents = () => {
  if (props.trigger == 'hover') {
    events.mouseenter = openFinal
    outerEvents.mouseleave = closeFinal
  } else if (props.trigger == 'click') {
    
    events.click = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger != oldTrigger) {
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (popperNode.value && triggerNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)
onMounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>
<style scoped>

</style>
