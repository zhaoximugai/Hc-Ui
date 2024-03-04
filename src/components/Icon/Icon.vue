<template>
    <i class="hc-icon" :class="{[`hc-icon--${type}`]:type}" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="filteredProps" />
    </i>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import type {IconProps} from './types'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {omit} from 'lodash-es'
defineOptions({
    name:'hc-icon',
    inheritAttrs:false
})
const props=defineProps<IconProps>()
const filteredProps=computed(()=>omit(props,['type','color']))
const customStyles=computed(()=>{
    return props.color?{color:props.color}:{}
})
</script>

<style scoped>

</style>