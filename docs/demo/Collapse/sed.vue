<script setup>
import {HcCollapse} from '@stophjc/hc-ui'
import {HcCollapseItem} from '@stophjc/hc-ui'
import {ref} from 'vue'
const openedValue = ref(['a'])
</script>

<template>
 <hc-collapse v-model="openedValue">
    <hc-collapseItem name="a"  >
      <template #title>
        <div style="color: red;">AAAAAAA</div>
      </template>
      <div>BBBBBBBBBBBBBBBBBBBBB</div>
    </hc-collapseItem>
    <hc-collapseItem name="b" title="Title B">
      <div>this is bbbbb test</div>
    </hc-collapseItem>
    <hc-collapseItem name="c" title="Disabled Title" disabled>
      <div>this is cccc test</div>
    </hc-collapseItem>
  </hc-collapse>
</template>
<style scoped>
</style>
