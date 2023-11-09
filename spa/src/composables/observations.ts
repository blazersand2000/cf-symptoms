import { useObservationsStore } from '@/stores/observations'
import type {
  ObservationInfo,
  SavedObservation,
  Observation,
  DisplayedObservation,
  ObservationInfoItem,
  Items
} from '@/types/types'
import { computed } from 'vue'

export function useObservations() {
  const observationsStore = useObservationsStore()

  const allObservations = computed<DisplayedObservation[]>(() => {
    console.log(observationsStore.allObservations)
    return observationsStore.allObservations.map((savedObservation) => {
      const combined: DisplayedObservation = {
        items: {},
        timestamp: savedObservation.timestamp,
        formattedTimestamp: savedObservation.timestamp.toLocaleString()
      }
      Object.entries(savedObservation.items).forEach((element) => {
        const key = element[0] as keyof Items<ObservationInfoItem>
        if (key in observationInfo.value) {
          const combinedItem = {
            [key]: { ...observationInfo.value[element[0] as keyof ObservationInfo], ...element[1] }
          }
          combined.items = { ...combined.items, ...combinedItem }
        }
      })
      return combined
    })
  })

  function addObservation(observation: Observation) {
    const newItem: SavedObservation = {
      ...observation,
      timestamp: new Date()
    }
    observationsStore.addObservation(newItem)
  }

  const observationInfo = computed<ObservationInfo>(() => ({
    collarBoneRetraction: {
      displayName: 'Retraction above the collarbone',
      type: 'measurement',
      icon: ''
    },
    ribRetraction: {
      displayName: 'Retraction in the rib area',
      type: 'measurement',
      icon: ''
    },
    chestCongestion: {
      displayName: 'Chest Congestion',
      type: 'symptom',
      icon: 'mdi-liquid-spot'
    },
    shortnessOfBreath: {
      displayName: 'Shortness of Breath',
      type: 'symptom',
      icon: 'mdi-lungs'
    },
    cough: {
      displayName: 'Coughing',
      type: 'symptom',
      icon: 'mdi-account-voice'
    },
    wheezing: {
      displayName: 'Wheezing',
      type: 'symptom',
      icon: 'mdi-weather-dust'
    },
    fatigue: {
      displayName: 'Fatigue',
      type: 'symptom',
      icon: 'mdi-eye-closed'
    },
    fever: {
      displayName: 'Fever',
      type: 'symptom',
      icon: 'mdi-emoticon-sick'
    }
  }))

  return { allObservations, observationInfo, addObservation }
}
