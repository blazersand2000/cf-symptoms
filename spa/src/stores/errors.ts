import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useErrorsStore = defineStore("errors", () => {
   const currentErrorRef = ref<DisplayedError>()

   function logError(userFriendlyDescription: string, technicalDescription?: string) {
      const error = {
         userFriendlyDescription,
         technicalDescription: technicalDescription
            ? technicalDescription
            : userFriendlyDescription,
      }
      currentErrorRef.value = undefined
      currentErrorRef.value = error
   }

   const currentError = computed(() => currentErrorRef.value)

   return { currentError, logError }
})

export interface DisplayedError {
   userFriendlyDescription: string
   technicalDescription: string
}
