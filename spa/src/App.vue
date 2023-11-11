<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="CF Symptoms Tracker">
      <template v-slot:append v-if="!showLogin">
        <div class="text-subtitle-1">{{ userGreeting }}</div>
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
      <LoginView v-if="showLogin" />
      <RouterView v-else />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import { useAuth } from '@/composables/auth'
import LoginView from '@/views/LoginView.vue'

const { loggedInUser, logout } = useAuth()

const showLogin = computed(() => !loggedInUser.value)

const userGreeting = computed(() => {
  if (!loggedInUser.value) {
    return ''
  }
  const displayedUser = loggedInUser.value.displayName ?? loggedInUser.value.email
  return `Hello, ${displayedUser}`
})
</script>
<style scoped></style>
