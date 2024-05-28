<template>
  <hc-button  icon="user">Default</hc-button>
  <hc-button type="primary" icon="eye" >Primary</hc-button>
  <hc-button type="success" icon="angle-down" >Success</hc-button>
  <hc-button type="info" icon="angle-left">Info</hc-button>
  <hc-button type="warning" icon="angle-right">Warning</hc-button>
  <hc-button type="danger" icon="angle-up">Danger</hc-button><br />
</template>

<script setup lang="ts">
import { HcButton } from '@stophjc/hc-ui'
</script>

<style scoped>
*{
    margin-top: 15px;
}
</style>
