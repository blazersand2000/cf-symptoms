<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <!-- <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer">
         <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
