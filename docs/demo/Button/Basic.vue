<script setup>
import {HcButton} from '@stophjc/hc-ui'

</script>

<template>
  <hc-button >Default</hc-button>
  <hc-button type="primary"  >Primary</hc-button>
  <hc-button type="success">Success</hc-button>
  <hc-button type="info">Info</hc-button>
  <hc-button type="warning">Warning</hc-button>
  <hc-button type="danger">Danger</hc-button><br>

  <hc-button plain>Plain</hc-button>
  <hc-button type="primary" plain>Primary</hc-button>
  <hc-button type="success" plain>Success</hc-button>
  <hc-button type="info" plain>Info</hc-button>
  <hc-button type="warning" plain>Warning</hc-button>
  <hc-button type="danger" plain>Danger</hc-button><br>

  <hc-button round>Round</hc-button>
  <hc-button type="primary" round>Primary</hc-button>
  <hc-button type="success" round>Success</hc-button>
  <hc-button type="info" round>Info</hc-button>
  <hc-button type="warning" round>Warning</hc-button>
  <hc-button type="danger" round>Danger</hc-button><br>

  <hc-button icon="user" circle />
  <hc-button type="primary" icon="user" circle />
  <hc-button type="success" icon="user" circle />
  <hc-button type="info" icon="user" circle />
  <hc-button type="warning" icon="user" circle />
  <hc-button type="danger" icon="user" circle />
</template>
<style scoped>
*{
    margin-top: 15px;
}
</style>
