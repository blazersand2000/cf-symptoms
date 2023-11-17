import { createRouter, createWebHistory } from "vue-router"
import ChartsView from "@/views/ChartsView.vue"
import HomeView from "@/views/HomeView.vue"
import UnderConstructionView from "@/views/UnderConstructionView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "home",
         component: HomeView,
         meta: { showInNav: true, title: "Home", icon: "mdi-home" },
      },
      {
         path: "/charts",
         name: "charts",
         component: UnderConstructionView,
         meta: { showInNav: true, title: "Charts", icon: "mdi-chart-line" },
      },
      {
         path: "/:catchAll(.*)",
         name: "not-found",
         component: NotFoundView, // Use your 404 component here
      },
   ],
})

export default router
