<template>
   <v-table density="compact">
      <tbody class="text-caption text-high-emphasis">
         <tr v-for="item in mealTimes" :key="item.key">
            <td>{{ item.key }}</td>
            <td>
               <v-icon :color="item.value.color">{{ item.value.icon }}</v-icon>
            </td>
         </tr>
         <tr>
            <td>Snacks <strong>with</strong> enzymes</td>
            <td>{{ snacks.withEnzymes }}</td>
         </tr>
         <tr>
            <td>Snacks <strong>without</strong> enzymes</td>
            <td>{{ snacks.withoutEnzymes }}</td>
         </tr>
      </tbody>
   </v-table>
</template>
<script setup lang="ts">
import type { Enzymes } from "@/types/types"
import { computed } from "vue"

const props = defineProps<{
   enzymes: Enzymes
}>()

const mealTimes = computed(() =>
   Object.entries(props.enzymes)
      .filter((entry) => ["Breakfast", "Lunch", "Dinner"].includes(entry[0]))
      .map((entry) => ({
         key: entry[0],
         value:
            entry[1].withEnzymes > 0
               ? { icon: "mdi-check-circle", color: "green" }
               : { icon: "mdi-close-circle", color: "red" },
      }))
)
const snacks = computed(() => props.enzymes.Snack)
</script>
<style scoped></style>
