<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Message from './components/Message/Message.vue'
import Input from './components/Input/Input.vue'
import Switch from './components/Switch/Switch.vue'
import HcSelect from './components/Select/Select.vue'
import { ref, onMounted, h, watch } from 'vue'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'
import { createMessage } from './components/Message/method'
import type {SelectOption} from './components/Select/types'
import remote   from './components/Select/Remote.vue'
import  Basic from  './components/Form/basic.vue'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref(['a'])

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is blod') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const option1:SelectOption[]=[
  {value:'1',label:'item1'},
  {value:'2',label:'app'},
  {value:'3',label:'test'}
]

const trigger = ref<any>('click')
onMounted(() => {
  const instance = createMessage({ message: 'hello word1', showClose: true, duration: 0 })
  createMessage({ message: 'hello word2', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello word3', duration: 0, type: 'warning', showClose: true })
  // createMessage({message:'hello word2'})
  // createMessage({message:'hello word3'})
  // createMessage({message:'hello word4'})
  setTimeout(() => {}, 2000)
})
const test = ref<string>('')
const test1=ref('on')
const customRender=(option:SelectOption)=>{
  return h('div',{className:'item'},[h('b',option.label),h('span',option.value)])
}
const add=ref()
</script>

<template>

  <header>
    <Basic></Basic>
  </header>

<header>
  <remote></remote>
</header>

  <header>
    <hc-select :renderLabel="customRender"  filterable v-model="test" :options="option1"  placeholder="请选择" >

    </hc-select>
  </header>

  <header>
    <Switch v-model="test"  inactive-value="off"  active-value="on" active-text="ON" inactive-text="Off" >

    </Switch>
  </header>

  <header  >
    <Input v-model="add" type="password" autofocus autocomplete="666"  placeholder="prepend append" clearable show-password>
    </Input>

    <Input v-model="add" placeholder="prepend append"  autocomplete="666">
      
    </Input>

   
  </header>

  <!-- <Message message="hello message" :duration="0" show-close /> -->

  <header>
    <Dropdown :trigger="trigger" :menu-options="options" >
      <div id="imgage">123456</div>
    </Dropdown>
  </header>

  <Tooltip content="hello word" :trigger="trigger" placement="right" manual>
    <img src="./assets//logo.svg" width="125" height="125" class="logo" />
  </Tooltip>
  <hc-button circle> hc-button</hc-button>
  
  <Button round @click="open">Round Button</Button>
  <Button circle> VK</Button>
  <Button disabled>Disabled Button</Button><br /><br />
  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br /><br />
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br /><br />
  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br /><br />
  <Button size="large" loading>Loading</Button>
  <Button size="large" icon="arrow-up">Icon</Button><br /><br />
  <Button size="large" icon="user">Icon</Button>

  <Collapse v-model="openedValue">
    <Item name="a" title="Title A">
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </Item>
    <Item name="b" title="Title B">
      <div>this is bbbbb test</div>
    </Item>
    <Item name="c" title="Disabled Title" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapse>
</template>

<style scoped>
header{
  margin-bottom: 50px;
}
</style>
