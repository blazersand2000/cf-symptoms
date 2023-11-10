<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="CF Symptoms Tracker">
      <template v-slot:append>
        <div class="text-subtitle-1">{{ displayedUser }}</div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical"></v-btn>
          </template>
          <v-list>
            <v-list-item value="sdf">
              <v-list-item-title @click="logout">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <!-- <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer">
         <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-main class="d-flex align-center justify-center" style="min-height: 300px;"> -->

    <v-main class="d-flex justify-center" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-app>

  <v-dialog v-model="showLogin" fullscreen :scrim="false" transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" dark v-bind="props">Add Observation</v-btn>
    </template>
    <v-card>
      <Login />
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import { useAuth } from '@/composables/auth'
import Login from './components/Login.vue'

const { loggedInUser, logout } = useAuth()

const showLogin = computed(() => !loggedInUser.value)

const displayedUser = computed(() =>
  loggedInUser.value ? `Hello, ${loggedInUser.value.email}` : ''
)
</script>
<style scoped></style>
