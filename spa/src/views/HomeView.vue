<template>
   <v-container style="max-width: 800px">
      <v-row style="mx-auto">
         <v-col cols="12" class="d-flex justify-center">
            <v-dialog
               v-model="dialog"
               fullscreen
               :scrim="false"
               transition="dialog-bottom-transition"
            >
               <template v-slot:activator="{ props }">
                  <v-btn color="primary" dark v-bind="props">Add Observation</v-btn>
               </template>
               <v-card>
                  <v-toolbar dark color="primary">
                     <v-btn icon dark @click="dialog = false">
                        <v-icon icon="mdi-close" />
                     </v-btn>
                     <v-toolbar-title>Add Observation</v-toolbar-title>
                     <v-spacer></v-spacer>
                     <v-toolbar-items>
                        <!-- <v-btn variant="text" @click="dialog = false"> Save </v-btn> -->
                     </v-toolbar-items>
                  </v-toolbar>
                  <SymptomsForm @submit="handleSubmit" />
               </v-card>
            </v-dialog>
         </v-col>
      </v-row>
      <v-row v-if="isLoading">
         <loading-spinner />
      </v-row>
      <v-row justify="center">
         <v-col
            cols="12"
            class="d-flex justify-center"
            v-for="observation in allObservations"
            :key="observation.formattedTimestamp"
         >
            <ObservationCard :observation="observation" />
         </v-col>
      </v-row>
   </v-container>
</template>
<script setup lang="ts">
import SymptomsForm from "@/components/SymptomsForm.vue"
import { ref } from "vue"
import { useObservations } from "@/composables/observations"
import ObservationCard from "@/components/observations/ObservationCard.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"

const { isLoading, allObservations } = useObservations()

const dialog = ref(false)

function handleSubmit() {
   dialog.value = false
}

// const showFever = computed(() =>

// )
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
   transition: transform 0.2s ease-in-out;
}
</style>
