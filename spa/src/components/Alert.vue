<template>
   <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
      {{ message }}
   </v-snackbar>
</template>

<script setup lang="ts">
import { useErrorsStore } from "@/stores/errors"
import { ref, watch, nextTick } from "vue"

const snackbar = ref(false)
const message = ref("")
const timeout = ref(3000)

const store = useErrorsStore()

watch(
   () => store.currentError,
   (newError, oldError) => {
      if (newError) {
         showMessage(newError.userFriendlyDescription, timeout.value)
      }
   }
)

function showMessage(userFriendlyDescription: string, newTimeout: number) {
   message.value = userFriendlyDescription
   timeout.value = newTimeout
   snackbar.value = false
   nextTick(() => {
      snackbar.value = true
   })
}
</script>
