<template>
   <div>
      <canvas ref="canvas"></canvas>
   </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue"
import { Chart, registerables, type ChartConfiguration } from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"

Chart.register(...registerables, MatrixController, MatrixElement)

const canvas: Ref<HTMLCanvasElement | null> = ref(null)

onMounted(() => {
   const config: ChartConfiguration<
      "matrix",
      { x: number; y: number; v: number }[],
      { x: number; y: number; v: number }
   > = {
      type: "matrix",
      data: {
         datasets: [
            {
               label: "My Matrix",
               data: [
                  { x: 0, y: 0, v: 10 },
                  { x: 1, y: 0, v: 20 },
                  { x: 0, y: 1, v: 30 },
                  { x: 1, y: 1, v: 40 },
               ],
               backgroundColor: function (context) {
                  var value = (
                     context.dataset.data[context.dataIndex] as { x: number; y: number; v: number }
                  ).v
                  var alpha = (value - 10) / 40
                  return alpha > 0.5 ? "rgba(0, 128, 0, 1)" : "rgba(0, 128, 0, 0.5)"
               },
            },
         ],
      },
      options: {
         scales: {
            x: { type: "linear" },
            y: { type: "linear" },
         },
      },
   }

   const chart = new Chart(canvas.value!.getContext("2d")!, config)
})
</script>
