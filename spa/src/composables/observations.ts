import { useObservationsStore } from "@/stores/observations"
import type {
   ObservationInfo,
   SavedObservation,
   Observation,
   DisplayedObservation,
   ObservationInfoItem,
   Items,
} from "@/types/types"
import { computed } from "vue"
import { useDatabase } from "./database"
import { useErrorsStore } from "@/stores/errors"

export function useObservations() {
   const { logError } = useErrorsStore()
   const { loading, observations, addObservation: addObservationToDb } = useDatabase(logError)

   const allObservations = computed<DisplayedObservation[]>(() => {
      const savedObservations = observations.value
      return savedObservations.map((savedObservation) =>
         convertFromSavedToDisplayedObservations(savedObservation, observationInfo.value)
      )
   })

   function addObservation(observation: Observation) {
      const newItem: SavedObservation = {
         ...observation,
         timestamp: new Date(),
      }
      addObservationToDb(newItem)
   }

   const observationInfo = computed<ObservationInfo>(() => globalObservationInfo)

   return {
      isLoading: loading,
      allObservations,
      observationInfo,
      addObservation,
   }
}

const globalObservationInfo: ObservationInfo = {
   collarBoneRetraction: {
      displayName: "Retraction above the collarbone",
      type: "respiratory",
      icon: "mdi-account-arrow-left",
   },
   ribRetraction: {
      displayName: "Retraction in the rib area",
      type: "respiratory",
      icon: "mdi-account-arrow-left",
   },
   cough: {
      displayName: "Coughing",
      type: "respiratory",
      icon: "mdi-account-voice",
   },
   aspiration: {
      displayName: "Aspiration",
      type: "respiratory",
      icon: "mdi-lungs",
   },
   mouthBreathing: {
      displayName: "Mouth breathing",
      type: "respiratory",
      icon: "mdi-emoticon-frown",
   },
   abnormalStool: {
      displayName: "Abnormal stools",
      type: "pancreatic",
      icon: "mdi-emoticon-poop",
   },
   constipation: {
      displayName: "Constipation",
      type: "pancreatic",
      icon: "mdi-filter-remove-outline",
   },
   diaperRash: {
      displayName: "Diaper rash",
      type: "pancreatic",
      icon: "mdi-human-baby-changing-table",
   },
   bloating: {
      displayName: "Bloating",
      type: "pancreatic",
      icon: "mdi-human-pregnant",
   },
   tummyPain: {
      displayName: "Tummy pain",
      type: "pancreatic",
      icon: "mdi-account-alert",
   },
}

function convertFromSavedToDisplayedObservations(
   savedObservation: SavedObservation,
   observationInfo: ObservationInfo
) {
   const combined: DisplayedObservation = {
      items: {},
      timestamp: savedObservation.timestamp,
      formattedTimestamp: savedObservation.timestamp.toLocaleString(),
   }
   Object.entries(savedObservation.items).forEach((element) => {
      const key = element[0] as keyof Items<ObservationInfoItem>
      if (key in observationInfo) {
         const combinedItem = {
            [key]: {
               ...observationInfo[element[0] as keyof ObservationInfo],
               ...element[1],
            },
         }
         combined.items = { ...combined.items, ...combinedItem }
      }
   })
   return combined
}
