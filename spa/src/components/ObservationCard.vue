<template>
   <v-card :subtitle="observation.formattedTimestamp" variant="tonal">
     <v-list :items="items" density="compact"></v-list>
   </v-card>
 </template>
 <script setup lang="ts">
import type { DisplayedConcreteObservation } from '@/types/types';
import { computed } from 'vue';
 
const props = defineProps<{
  observation: DisplayedConcreteObservation
}>()

const items = computed(() => {
   var entries = Object.entries(props.observation.measurements).concat(Object.entries(props.observation.symptoms)).map(([key, value]) => ({
      key,
      value,
   }))
   return entries
})
 </script>
 