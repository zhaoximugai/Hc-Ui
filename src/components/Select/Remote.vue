<template>
    <Select v-model="query" filterable placeholder="远程搜索" remote :remote-method="remoteMethod"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Select from './Select.vue';
import type { SelectOption } from './types';
const query=ref('')
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]
const remoteMethod = (query: string) :Promise<SelectOption[]> => {
 return new Promise((resolve)=>{
    if (query) {
        setTimeout(() => {
            const options=states.filter((item)=>{
                return item.toLowerCase().includes(query.toLowerCase())
            }).map(label=>{
                return {label,value:label}
            })
            resolve(options)
        }, 500);
    }else{
        resolve([])
    }
 })
}
</script>

<style scoped>

</style>