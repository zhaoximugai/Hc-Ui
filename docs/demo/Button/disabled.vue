<template>
  <hc-button disabled>Default</hc-button>
  <hc-button type="primary"  disabled>Primary</hc-button>
  <hc-button type="success" disabled>Success</hc-button>
  <hc-button type="info" disabled>Info</hc-button>
  <hc-button type="warning" disabled>Warning</hc-button>
  <hc-button type="danger" disabled>Danger</hc-button><br />
</template>

<script setup lang="ts">
import {HcButton} from '@stophjc/hc-ui'

</script>

<style scoped>
*{
    margin-top: 15px;
}
</style>
