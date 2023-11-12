import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
   components,
   directives,
   icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
         mdi,
      },
   },
});

var firebaseConfig = {
   apiKey: "AIzaSyAO5ytuKmgtcmOSZdPhR1cE3jB7uznKgls",
   authDomain: "cf-symptoms.firebaseapp.com",
   // The value of `databaseURL` depends on the location of the database
   databaseURL: "https://DATABASE_NAME.firebaseio.com",
   projectId: "cf-symptoms",
   storageBucket: "cf-symptoms.appspot.com",
   messagingSenderId: "444675153528",
   appId: "1:444675153528:web:7f6c058fb6aab385e9978d",
   // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
   measurementId: "G-MEASUREMENT_ID",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
