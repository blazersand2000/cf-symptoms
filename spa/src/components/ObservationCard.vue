<template>
   <v-card :subtitle="observation.formattedTimestamp" variant="tonal">
     <v-list :items="observation." density="compact"></v-list>
   </v-card>
 </template>
 <script setup lang="ts">
import type { DisplayedConcreteObservation } from '@/types/types';
import { computed } from 'vue';
 
const props = defineProps<{
  observation: DisplayedConcreteObservation
}>()

const items = computed(() => props.observation.me)
 </script>
 