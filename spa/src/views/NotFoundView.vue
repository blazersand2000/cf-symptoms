<template>
   <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
         <v-col cols="12" sm="8" md="6">
            <v-card class="pa-4" outlined>
               <v-card-title class="text-h4"> 404 - Page Not Found </v-card-title>
               <v-card-text>
                  The page you're looking for doesn't exist. Check the URL, or head back home.
               </v-card-text>
               <v-card-actions>
                  <router-link to="/">
                     <v-btn color="primary">Go Home</v-btn>
                  </router-link>
               </v-card-actions>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
