<template>
  <v-card-text>
    <h2 class="text-h6 mb-2">Were any retractions observed?</h2>
  </v-card-text>
  <v-checkbox v-model="retractions" label="Rib area" value="rib"></v-checkbox>
  <v-checkbox v-model="retractions" label="Above the collarbone" value="collarbone"></v-checkbox>
</template>
<script setup>
</script>