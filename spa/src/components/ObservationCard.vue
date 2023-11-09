<template>
   <v-card min-width="300px" :subtitle="observation.formattedTimestamp" variant="tonal">
     <v-list :items="items" density="compact">
      <template v-slot:item="{props: {key: key, value: value}}">
         <v-list-item :value="key" :title="value">
         </v-list-item>
      </template>
   </v-list>
     
   </v-card>
 </template>
 <script setup lang="ts">
import type { DisplayedObservation } from '@/types/types';
import { computed } from 'vue';
 
const props = defineProps<{
  observation: DisplayedObservation
}>()

const items = computed(() => {
   var entries = Object.entries(props.observation.items).map((entry) => ({
      key: entry[0],
      value: entry[1].displayName,
   }))
   return entries
})
 </script>
 