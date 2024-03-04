<template>
  <div class="hc-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="hc-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              class="hc-dropdown__item"
              :class="{
                disabled: item.disabled,
                divided: item.divided
              }"
              :id="`dropdown-item-${item.key}`"
              @click="itemClick(item)"
            >
              <RenderVnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { DropdownEmits, DropdownInstance, DropdownProps,MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type  {TooltipInstance} from '../Tooltip/types'
import type {Ref} from 'vue'
import { ref } from 'vue';
import RenderVnode from '../Common/RenderVnode'
defineOptions({
  name:'hc-dropdown'
})
const props = withDefaults(defineProps<DropdownProps>(),{
  hideAfterClick:true
})
const emits = defineEmits<DropdownEmits>()
const tooltipRef=ref()  as Ref<TooltipInstance>
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
  
}

const itemClick=(e:MenuOption)=>{
  if (e.disabled) {
    return 
  }
  emits('select',e)
  if (props.hideAfterClick) {
    tooltipRef.value.hide()
  }
}
defineExpose<DropdownInstance>({
  show:()=>tooltipRef.value.show(),
  hide:()=>tooltipRef.value.hide()
})
</script>

<style scoped></style>
