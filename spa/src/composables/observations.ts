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
import { useDatabase } from './database'

export function useObservations() {
  const { getObservations, addObservation: addObservationToDb } = useDatabase()

  const allObservations = computed<DisplayedObservation[]>(() => {
    const savedObservations = getObservations.value
    return savedObservations.map((savedObservation) =>
      convertFromSavedToDisplayedObservations(savedObservation, observationInfo.value)
    )
  })

  function addObservation(observation: Observation) {
    const newItem: SavedObservation = {
      ...observation,
      timestamp: new Date()
    }
    addObservationToDb(newItem)
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

function convertFromSavedToDisplayedObservations(
  savedObservation: SavedObservation,
  observationInfo: ObservationInfo
) {
  const combined: DisplayedObservation = {
    items: {},
    timestamp: savedObservation.timestamp,
    formattedTimestamp: savedObservation.timestamp.toLocaleString()
  }
  Object.entries(savedObservation.items).forEach((element) => {
    const key = element[0] as keyof Items<ObservationInfoItem>
    if (key in observationInfo) {
      const combinedItem = {
        [key]: { ...observationInfo[element[0] as keyof ObservationInfo], ...element[1] }
      }
      combined.items = { ...combined.items, ...combinedItem }
    }
  })
  return combined
}
