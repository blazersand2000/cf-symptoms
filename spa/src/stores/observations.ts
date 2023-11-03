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
  const allObservations = computed<DisplayedConcreteObservation[]>(() =>
    observations.value.map((observation) => ({
      ...observation,
      formattedTimestamp: observation.timestamp.toLocaleString()
    }))
  )
  function addObservation(observation: NewConcreteObservation) {
    const newItem: SavedConcreteObservation = {
      ...observation,
      timestamp: new Date()
    }
    observations.value.push(newItem)
  }

  const observationInfo = computed(() => {
    const info: ObservationInfo = {
      measurements: {
        collarBoneRetraction: {
          displayName: 'Retraction above the collarbone',
          icon: ''
        },
        ribRetraction: {
          displayName: 'Retraction in the rib area',
          icon: ''
        }
      },
      symptoms: {
        chestCongestion: {
          displayName: 'Chest Congestion',
          icon: 'mdi-liquid-spot'
        },
        shortnessOfBreath: {
          displayName: 'Shortness of Breath',
          icon: 'mdi-lungs'
        },
        cough: {
          displayName: 'Coughing',
          icon: 'mdi-account-voice'
        },
        wheezing: {
          displayName: 'Wheezing',
          icon: 'mdi-weather-dust'
        },
        fatigue: {
          displayName: 'Fatigue',
          icon: 'mdi-eye-closed'
        },
        fever: {
          displayName: 'Fever',
          icon: 'mdi-emoticon-sick'
        }
      }
    }
    return info
  })

  return { observations, allObservations, addObservation, observationInfo }
})
