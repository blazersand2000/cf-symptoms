<template>
   <div class="container">
      <v-card
         class="auto text-center"
         title="Welcome to CF Symptoms Tracker"
         subtitle="Login to track your data"
      >
         <div id="firebaseui-auth-container"></div>
         <div id="loader">Loading...</div>
      </v-card>
   </div>
</template>
<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import { onMounted } from "vue";

const uiConfig = {
   callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
         // User successfully signed in.
         // Return type determines whether we continue the redirect automatically
         // or whether we leave that to developer to handle.

         //don't refresh page
         return false;
      },
      uiShown: function () {
         // The widget is rendered.
         // Hide the loader.
         document.getElementById("loader").style.display = "none";
      },
   },
   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
   signInFlow: "popup",
   signInSuccessUrl: "http://localhost:8080/",
   signInOptions: [
      {
         provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
         requireDisplayName: false,
      },
      {
         provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      },
   ],
   // Terms of service url.
   tosUrl: "<your-tos-url>",
   // Privacy policy url.
   privacyPolicyUrl: "<your-privacy-policy-url>",
};

onMounted(() => {
   const { firebaseUi } = useAuth();

   firebaseUi.value.start("#firebaseui-auth-container", uiConfig);
});
</script>
<style scoped>
.container {
   display: flex;
   justify-content: center;
   align-items: center;
   /* height: 100vh; */
}
</style>
