<template>
   <v-table density="compact" v-if="text">
      <tbody class="text-caption text-high-emphasis">
         <tr>
            <td>{{ text }}</td>
         </tr>
      </tbody>
   </v-table>
</template>
<script setup lang="ts">
const props = defineProps<{
   text: string
}>()
</script>
<style scoped></style>
