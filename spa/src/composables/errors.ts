import { computed, ref } from "vue"

export function useErrors(onError: ((error: DisplayedError) => void) | null = null) {
   const logError = (userFriendlyDescription: string, technicalDescription?: string) => {
      const error = {
         userFriendlyDescription,
         technicalDescription: technicalDescription
            ? technicalDescription
            : userFriendlyDescription,
      }
      if (onError) {
         onError(error)
      }
   }

   return {
      logError,
   }
}

export interface DisplayedError {
   userFriendlyDescription: string
   technicalDescription: string
}
