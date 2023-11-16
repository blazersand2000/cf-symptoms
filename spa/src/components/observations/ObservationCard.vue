<template>
   <v-card min-width="300px" :title="observation.formattedTimestamp" variant="tonal">
      <v-list density="compact">
         <v-list-item v-for="item in items" :key="item.key" :title="item.value.displayName">
            <DefaultDetail v-if="item.key !== 'enzymes'" :text="getDetail(item.value)" />
            <EnzymesDetail v-else :enzymes="item.value" />
         </v-list-item>
      </v-list>
   </v-card>
</template>
<script setup lang="ts">
import type { DisplayedObservation, Enzymes, SelectableTimesOfDay } from "@/types/types"
import { computed } from "vue"
import EnzymesDetail from "@/components/observations/EnzymesDetail.vue"
import DefaultDetail from "@/components/observations/DefaultDetail.vue"

const props = defineProps<{
   observation: DisplayedObservation
}>()

const items = computed(() => {
   return Object.entries(props.observation.items).map(([key, value]) => ({ key, value }))
})

function getDetail(item: any) {
   if (item.type) {
      return item.type
   }
   if (item.timesTaken) {
      const selectableTimesOfDay = item as SelectableTimesOfDay
      return selectableTimesOfDay.timesTaken.join(", ")
   }
   if (item.Breakfast) {
      const enzymes = item as Enzymes
      return `Breakfast: ${enzymes.Breakfast.withEnzymes > 0 ? "Yes" : "No"}, Lunch: ${
         enzymes.Lunch.withEnzymes > 0 ? "Yes" : "No"
      }, Dinner: ${enzymes.Dinner.withEnzymes > 0 ? "Yes" : "No"},\n Snacks with enzymes: ${
         enzymes.Snack.withEnzymes
      }, Snacks without enzymes: ${enzymes.Snack.withoutEnzymes}`
   }
   return ""
}
</script>
<style scoped></style>
