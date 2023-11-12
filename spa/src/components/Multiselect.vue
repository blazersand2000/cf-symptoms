<template>
   <div>
      <h2>{{ title }}</h2>
      <v-checkbox
         v-for="item in items"
         :key="item.key"
         :label="item.value"
         :value="item"
         v-model="modelValue"
      ></v-checkbox>
   </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
   modelValue: { key: string; value: string }[]
   title: string
   items: { key: string; value: string }[]
}>()

const emit = defineEmits(["update:modelValue"])

const modelValue = computed({
   get: () => props.modelValue,
   set: (value) => emit("update:modelValue", value),
})
</script>
