<template>
  <div>
    <h1>Welcome to CF Symptoms</h1>
  </div>
  <div id="firebaseui-auth-container"></div>
  <div>
    <v-btn v-if="isLoggedIn" color="info" @click="handleLogOut">Log out</v-btn>
  </div>
  <div id="loader">Loading...</div>
</template>
<script setup lang="ts">
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { ref } from 'vue'

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.

      console.log('AAAA')
      console.log(authResult)
      isLoggedIn.value = true

      //don't refresh page
      return false
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none'
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'http://localhost:8080/',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    }
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
}

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('#firebaseui-auth-container', uiConfig)

const isLoggedIn = ref(false)

function handleLogOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      isLoggedIn.value = false
      ui.start('#firebaseui-auth-container', uiConfig)

    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    })
}
</script>
<style></style>
