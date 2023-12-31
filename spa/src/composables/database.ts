import {
   getFirestore,
   collection,
   doc,
   onSnapshot,
   addDoc,
   type Unsubscribe,
   query,
   orderBy,
} from "firebase/firestore"
import { ref, computed, watch } from "vue"
import { useAuth } from "./auth" // replace with your auth composable path
import type { SavedObservation } from "@/types/types"
import type { FirebaseError } from "firebase/app"

export function useDatabase(onError: ((error: string) => void) | null = null) {
   const db = getFirestore()
   const { loggedInUser } = useAuth() // get the currently logged in user
   const observationsRef = ref<SavedObservation[]>([])
   const loadingRef = ref(true)
   const unsubscribe = ref<Unsubscribe>()

   function handleError(err: FirebaseError) {
      if (onError) {
         onError(err.message)
      }
   }

   watch(loggedInUser, (value) => {
      if (unsubscribe.value) {
         unsubscribe.value()
      }
      if (!value) {
         return
      }

      loadingRef.value = true
      const userDoc = doc(db, "users", value.uid)
      const obsCollection = collection(userDoc, "observations")
      const q = query(obsCollection, orderBy("timestamp", "desc"))
      unsubscribe.value = onSnapshot(
         q,
         (snapshot) => {
            observationsRef.value = snapshot.docs.map((doc) => {
               const data = doc.data()
               // Firebase stores Date type as Timestamp, so convert it back to Date
               if (data.timestamp) {
                  data.timestamp = data.timestamp.toDate()
               }
               return data as SavedObservation
            })
            loadingRef.value = false
         },
         handleError
      )
   })

   const loading = computed(() => {
      return loadingRef.value
   })

   const observations = computed(() => {
      if (!loggedInUser.value) {
         return []
      }

      return observationsRef.value
   })

   async function addObservation(observation: SavedObservation) {
      if (!loggedInUser.value) {
         return
      }

      try {
         const userDoc = doc(db, "users", loggedInUser.value.uid)
         await addDoc(collection(userDoc, "observations"), observation)
      } catch (err) {
         handleError(err as FirebaseError)
      }
   }

   return { loading, observations, addObservation }
}
