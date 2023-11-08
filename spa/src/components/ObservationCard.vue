<template>
   <v-card :subtitle="observation.formattedTimestamp" variant="tonal">
     <v-list :items="items" item-title="value" density="compact"></v-list>
   </v-card>
 </template>
 <script setup lang="ts">
import type { DisplayedObservation } from '@/types/types';
import { computed } from 'vue';
 
const props = defineProps<{
  observation: DisplayedObservation
}>()

const items = computed(() => {
   var entries = Object.entries(props.observation.items).map(([key, value]) => ({
      key,
      value,
   }))
   return entries
})
 </script>
 