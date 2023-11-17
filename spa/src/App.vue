<template>
   <v-app class="rounded rounded-md">
      <v-app-bar>
         <div v-show="isMobile && !showLogin">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
         </div>
         <div :class="{ 'd-flex align-center': !isMobile }">
            <v-toolbar-title class="ml-3 mr-5">CF Tracker</v-toolbar-title>
            <div v-show="!isMobile && !showLogin">
               <v-toolbar-items>
                  <v-list-item v-for="route in navRoutes" :key="route.to" :to="route.to">{{
                     route.title
                  }}</v-list-item>
               </v-toolbar-items>
            </div>
         </div>
         <template v-slot:append v-if="!showLogin">
            <div class="text-subtitle-1" v-show="!isMobile">{{ userGreeting }}</div>
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
      <div v-show="isMobile">
         <v-navigation-drawer v-model="drawer">
            <v-list>
               <v-list-item
                  v-for="route in navRoutes"
                  :key="route.to"
                  :to="route.to"
                  :title="route.title"
                  :prepend-icon="route.icon"
               />
               <v-divider></v-divider>
               <v-list-item>
                  <v-list-item-subtitle>{{ userGreeting }}</v-list-item-subtitle>
               </v-list-item>
            </v-list>
         </v-navigation-drawer>
      </div>

      <v-main class="d-flex justify-center" style="min-height: 300px">
         <LoginView v-if="showLogin" />
         <RouterView v-else />
      </v-main>
      <AlertBar />
   </v-app>
</template>
<script setup lang="ts">
import { RouterView, useRouter } from "vue-router"
import { computed, ref } from "vue"
import { useAuth } from "@/composables/auth"
import LoginView from "@/views/LoginView.vue"
import AlertBar from "./components/AlertBar.vue"
import { useDisplay } from "vuetify"

const { loggedInUser, logout } = useAuth()

const drawer = ref(false)

const display = useDisplay()
const router = useRouter()

const isMobile = computed(() => display.smAndDown.value)

const showLogin = computed(() => !loggedInUser.value)

const userGreeting = computed(() => {
   if (!loggedInUser.value) {
      return ""
   }
   const displayedUser = loggedInUser.value.displayName ?? loggedInUser.value.email
   return `Hello, ${displayedUser}`
})

const navRoutes = computed(() => {
   return router.options.routes
      .filter((route) => route.meta?.showInNav)
      .map((route) => ({
         title: (route.meta?.title as string) || "",
         value: route.path,
         icon: (route.meta?.icon as string) || "",
         to: route.path,
         props: {
            to: route.path,
            exact: true,
         },
      }))
})
</script>
<style scoped></style>
