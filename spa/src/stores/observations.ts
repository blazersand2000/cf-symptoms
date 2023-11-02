import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Observation } from '@/types/types'

export const useObservationsStore = defineStore('observations', () => {
  const observations = ref<Observation[]>([])
  const allObservations = computed(() =>
    observations.value.map((observation) => ({
      observations: observation.observations,
      timestamp: observation.timestamp.toLocaleString()
    }))
  )
  function addObservation(observation: string[]) {
    const newItem: Observation = {
      observations: observation,
      timestamp: new Date()
    }
    observations.value.push(newItem)
  }

  return { observations, allObservations, addObservation }
})
