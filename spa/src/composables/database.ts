import { getFirestore, collection, doc, onSnapshot, addDoc } from "firebase/firestore";
import { ref, computed } from 'vue';
import { useAuth } from './auth'; // replace with your auth composable path
import type { SavedObservation } from "@/types/types";
import type { FirebaseError } from "firebase/app";

interface User {
   // Define your user properties here
}

export function useDatabase() {
   const db = getFirestore();
   const { loggedInUser } = useAuth(); // get the currently logged in user
   const error = ref();
   const observations = ref<SavedObservation[]>([]);

   function handleError(err: FirebaseError) {
      error.value = err.message;
    }

   const getObservations = computed(() => {
      if (!loggedInUser.value) {
         return [];
      }
      const userDoc = doc(db, 'users', loggedInUser.value.uid);
      const obsCollection = collection(userDoc, 'observations');

      onSnapshot(obsCollection, (snapshot) => {
         observations.value = snapshot.docs.map(doc => doc.data() as SavedObservation);
      }, handleError);

      return observations.value;
   });

   async function addObservation(observation: SavedObservation) {
      if (!loggedInUser.value) {
         return;
      }

      try {
         const userDoc = doc(db, 'users', loggedInUser.value.uid);
         await addDoc(collection(userDoc, 'observations'), observation);
      } catch (err) {
         handleError(err as FirebaseError);
      }

      return { error };
   }

   return { getObservations, addObservation, error };
}