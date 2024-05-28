<script setup>
import {HcCollapse} from '@stophjc/hc-ui'
import {HcCollapseItem} from '@stophjc/hc-ui'
import {ref} from 'vue'
const openedValue = ref(['a'])

</script>

<template>
 <hc-collapse v-model="openedValue" accordion>
    <hc-collapseItem name="a" title="Title A">
      <h1>headline title</h1>
      <div>this is content a aaa</div>
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
