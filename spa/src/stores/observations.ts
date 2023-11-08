import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  SavedObservation
} from '@/types/types'

export const useObservationsStore = defineStore('observations', () => {
  const observations = ref<SavedObservation[]>([])
  const allObservations = computed(() => observations.value)
  function addObservation(observation: SavedObservation) {
    observations.value.push(observation)
  }

  return { observations, allObservations, addObservation }
})
