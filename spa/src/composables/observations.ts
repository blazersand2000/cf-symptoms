import { useObservationsStore } from '@/stores/observations'
import type {
  ObservationInfo,
  SavedObservation,
  Observation,
  DisplayedObservation} from '@/types/types'
import { computed } from 'vue'

export function useObservations() {
  const observationsStore = useObservationsStore()

  const allObservations = computed<DisplayedObservation[]>(() => {
    return observationsStore.allObservations.map((savedObservation) => {
      const combined: DisplayedObservation = { items: {}, timestamp: savedObservation.timestamp, formattedTimestamp: savedObservation.timestamp.toLocaleString() }
      Object.entries(savedObservation.items).forEach(element => {
         if (element[0] in observationInfo.value) {
            combined.items = { ...combined.items, ...observationInfo.value[element[0] as keyof ObservationInfo] }
         }
      });
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
