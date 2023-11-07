import { useObservationsStore } from '@/stores/observations'
import type { DisplayedConcreteObservation, NewConcreteObservation, ObservationInfo, SavedConcreteObservation } from '@/types/types'
import { computed } from 'vue'

export function useObservations() {
  const observationsStore = useObservationsStore()

  const allObservations = computed<DisplayedConcreteObservation[]>(() =>
    observationsStore.allObservations.map((observation) => ({
      ...observation,
      measurements: {
         ...observation.measurements,
         ...observationInfo.value.measurements,
      },
      symptoms: {
         ...observation.symptoms,
         ...observationInfo.value.symptoms,
      },
      formattedTimestamp: observation.timestamp.toLocaleString()
    }))
  )

  function addObservation(observation: NewConcreteObservation) {
   const newItem: SavedConcreteObservation = {
     ...observation,
     timestamp: new Date()
   }
   observationsStore.addObservation(newItem)
 }

  const observationInfo = computed<ObservationInfo>(() => ({
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
  }))

  return { allObservations, observationInfo, addObservation }
}
