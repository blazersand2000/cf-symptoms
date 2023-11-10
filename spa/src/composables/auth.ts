import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import { computed, ref } from 'vue'

export function useAuth() {
  // Initialize the FirebaseUI Widget using Firebase.
  const firebaseUi = computed(
    () => firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(firebase.auth())
  )

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      // ...
    } else {
      // User is signed out
      // ...
    }
    loggedInUserRef.value = user
  })

  const loggedInUserRef = ref<firebase.User | null>()
  const loggedInUser = computed(() => loggedInUserRef.value)

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  return { firebaseUi, loggedInUser, logout }
}
