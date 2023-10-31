<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
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
            <v-btn variant="text" @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <SymptomsForm />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup lang="ts">
import SymptomsForm from "@/components/SymptomsForm.vue";
import { ref } from 'vue'

const dialog = ref(false)
const notifications = ref(false)
const sound = ref(false)
const widgets = ref(false)
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
