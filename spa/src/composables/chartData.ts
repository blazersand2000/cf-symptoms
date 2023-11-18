import { ref, computed } from "vue"
import { useObservations } from "./observations"

export function useChartData() {
   const observations = useObservations()

   // Track the current day
   const currentDay = ref(new Date())

   // Update currentDay at midnight
   const updateCurrentDay = () => {
      const now = new Date()
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      const timeUntilMidnight = nextDay.getTime() - now.getTime()

      setTimeout(() => {
         // Recompute last 30 days of observations when currentDay changes
         currentDay.value = new Date()
         updateCurrentDay()
      }, timeUntilMidnight)
   }
   updateCurrentDay()

   const data = computed(() => {
      //We need to get the Dates of the last 30 days (from the user timezone perspective) including today (we just want the date here we don't care about time of day).
      //Then we need to get every property in observationInfo.
      //we need to return an array of objects {x: string, y: string, v: bool}[], one for every combination of date and property in observationInfo.
      // x should be the date formatted as YYYY-MM-DD, y is the displayName of the property in observationInfo.
      //to determine the value of v of each object, first get all objects in last30 whos timestamp properties have the same date (as observed from the user's timezone perspective, again we just care about date not time of day) as the formatted date of x.
      //then for all of those matching objects, return true if any of them have a non-null value for the property key that matches the property key of the property in observationInfo.

      const observationInfo = observations.observationInfo.value

      // Get the dates of the last 30 days
      const dates = Array.from({ length: 30 }, (_, i) => {
         const date = new Date(currentDay.value)
         date.setDate(date.getDate() - i)
         return formatDateLocal(date) // Format as YYYY-MM-DD in local timezone
      })

      // Create an array of objects for every combination of last 30 dates and observationInfo properties
      const result = dates.flatMap((date) => {
         return Object.entries(observationInfo).map(([key, { displayName }]) => {
            // Get all observations for the current date and property
            const matchingObservations = observations.allObservations.value.filter(
               (observation) => {
                  const observationDate = new Date(observation.timestamp)
                  if (formatDateLocal(observationDate) !== date) {
                     return false
                  }
                  if (!(key in observation.items)) {
                     return false
                  }
                  const item = observation.items[key as keyof typeof observation.items]
                  if (!item) {
                     return false
                  }
                  if ("Breakfast" in item) {
                     return (
                        item.Breakfast.withEnzymes +
                           item.Lunch.withEnzymes +
                           item.Dinner.withEnzymes +
                           item.Snack.withEnzymes >
                        0
                     )
                  }
                  return true
               }
            )

            return {
               x: date,
               y: displayName,
               v: matchingObservations.length > 0,
            }
         })
      })

      return result
   })

   return { isLoading: observations.isLoading, data }
}

function formatDateLocal(date: Date): string {
   const year = date.getFullYear()
   const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
   const day = String(date.getDate()).padStart(2, "0")
   return `${year}-${month}-${day}`
}
