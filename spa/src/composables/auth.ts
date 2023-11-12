import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { computed, ref } from "vue";

export function useAuth() {
   // References
   const loggedInUserRef = ref<firebase.User | null>(null);

   // Computed properties
   const firebaseUi = computed(
      () =>
         firebaseui.auth.AuthUI.getInstance() ??
         new firebaseui.auth.AuthUI(firebase.auth())
   );
   const loggedInUser = computed(() => loggedInUserRef.value);

   // Functions
   const logout = async () => {
      try {
         await firebase.auth().signOut();
      } catch (error) {
         console.error(error);
      }
   };

   // Event listeners
   firebase.auth().onAuthStateChanged((user) => {
      loggedInUserRef.value = user;
      if (user) {
         localStorage.setItem("user", JSON.stringify(user));
      } else {
         localStorage.removeItem("user");
      }
   });

   // Initialization
   const storedUser = localStorage.getItem("user");
   if (storedUser) {
      loggedInUserRef.value = JSON.parse(storedUser);
   }

   // Exposed API
   return { firebaseUi, loggedInUser, logout };
}
