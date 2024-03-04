<template>
  <div
    class="hc-select"
    :class="{
      disabled: disabled
    }"
    @click="toggleDropdown"
    @mouseenter="status.mouseHover = true"
    @mouseleave="status.mouseHover = false"
  >
    <Tooltip
      @click-outside="controlDropdown(false)"
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
    >
      <Input
        v-model="status.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceHolder"
        :readonly="!filterable"
        ref="inputRef"
        @input="debouceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            @click.stop="onClear"
            @mousedown.prevent="() => {}"
            icon="circle-xmark"
            v-if="showClearIcon"
            class="hc-input__clear"
          ></Icon>
          <Icon
            icon="angle-down"
            v-else
            class="header-angle"
            :class="{ active: isDropdownShow }"
          ></Icon>
        </template>
      </Input>
      <template #content>
        <div class="hc-select__loading" v-if="status.loading">
          <Icon icon="spinner" spin></Icon>
        </div>
        <div class="hc-select__nodata" v-else-if="filterable && filteredOptions.length == 0">
          No Data
        </div>
        <ul class="hc-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="hc-select__menu-item"
              :class="{
                disabled: item.disabled,
                'is-selected': status.selectedOption?.value == item.value,
                highlighted: status.highlightIndex == index
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { SelectEmits, SelectOption, SelectProps, SelectStatus } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import type { TooltipInstance } from '../Tooltip/types'
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { InputInstance } from '../Input/types'
import RenderVnode from '../Common/RenderVnode'
import { isFunction, debounce } from 'lodash-es'
defineOptions({
  name: 'HcSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const timeout = computed(() => {
  return props.remote ? 300 : 0
})
const emits = defineEmits<SelectEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const isDropdownShow = ref(false)
// popper设置相同的宽度
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}
const filteredOptions = ref(props.options)
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  }
)
const generateFilterOptions = async (serachValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(isFunction)) {
    filteredOptions.value = props.filterMethod(serachValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    status.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(serachValue)
      console.log(filteredOptions.value)
    } catch (error) {
      console.error(error)
      filteredOptions.value = []
    } finally {
      status.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter((option) => option.label.includes(serachValue))
  }
  status.highlightIndex = -1
}
const onFilter = () => {
  generateFilterOptions(status.inputValue)
}
const debouceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)
const filteredPlaceHolder = computed(() => {
  return props.filterable && status.selectedOption && isDropdownShow.value
    ? status.selectedOption.label
    : props.placeholder
})
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value == value)
  return option ? option : null
}
const initialOption = findOption(props.modelValue)
const innerValue = ref(initialOption ? initialOption.label : '')
const status = reactive<SelectStatus>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})

const controlDropdown = (show: boolean) => {
  if (show) {
    if (props.filterable && status.selectedOption) {
      status.inputValue = ''
    }
    if (props.filterable) {
      generateFilterOptions(status.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    if (props.filterable) {
      status.inputValue = status.selectedOption ? status.selectedOption.label : ''
    }
    status.highlightIndex = -1
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      e.preventDefault()
      if (!isDropdownShow.value) {
        toggleDropdown()
      } else {
        if (status.highlightIndex > -1 && filteredOptions.value[status.highlightIndex]) {
          itemSelect(filteredOptions.value[status.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      e.preventDefault()

      if (filteredOptions.value.length > 0) {
        if (status.highlightIndex == -1 || status.highlightIndex == 0) {
          status.highlightIndex = filteredOptions.value.length - 1
        } else {
          status.highlightIndex--
        }
      }
      break
    case 'ArrowDown':
      if (filteredOptions.value.length > 0) {
        if (
          status.highlightIndex == -1 ||
          status.highlightIndex == filteredOptions.value.length - 1
        ) {
          status.highlightIndex = 0
        } else {
          status.highlightIndex++
        }
      }
      break
    default:
      break
  }
}
const showClearIcon = computed(() => {
  return (
    props.clearable && status.mouseHover && status.selectedOption && status.inputValue.trim() != ''
  )
})
const onClear = () => {
  status.inputValue = ''
  status.selectedOption = null
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  status.inputValue = e.label
  status.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>

<style scoped></style>
