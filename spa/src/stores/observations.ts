import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  DisplayedConcreteObservation,
  NewConcreteObservation,
  ObservationInfo,
  SavedConcreteObservation
} from '@/types/types'

export const useObservationsStore = defineStore('observations', () => {
  const observations = ref<SavedConcreteObservation[]>([])
  const allObservations = computed(() => observations.value)
  function addObservation(observation: SavedConcreteObservation) {
    observations.value.push(observation)
  }

  return { observations, allObservations, addObservation }
})
