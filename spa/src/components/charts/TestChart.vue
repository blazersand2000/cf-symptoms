<template>
   <div class="chart-container" style="position: relative; height: 80vh">
      <canvas ref="canvas"></canvas>
   </div>
   <!-- pretty print chartdata.data for debugging -->
   <!-- <pre>{{ JSON.stringify(chartData.data.value, null, 2) }}</pre> -->
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue"
import { Chart, registerables, type ChartConfiguration } from "chart.js"
import { MatrixController, MatrixElement, type MatrixDataPoint } from "chartjs-chart-matrix"
import "chartjs-adapter-luxon"
import { useChartData } from "@/composables/chartData"

interface MyMatrixDataPoint extends MatrixDataPoint {
   v: boolean
}

const chartData = useChartData()

Chart.register(...registerables, MatrixController, MatrixElement)

const canvas = ref(null)
let chartInstance: Chart | null = null

// const observations = Array.from({ length: 15 }, (_, i) => `Observation ${i + 1}`)
// const lastThirtyDays = Array.from({ length: 30 }, (_, i) => {
//    const date = new Date(Date.now() - 86400000 * i)
//    return date.toISOString().substr(0, 10) // format as YYYY-MM-DD
// })

// // Generate data for each observation of each day
// const data = observations.flatMap((observation, y) =>
//    lastThirtyDays.map((day, x) => ({ x: day, y, v: Math.random() > 0.5 }))
// )

const data = computed(() => ({
   datasets: [
      {
         label: "My Matrix",
         data: chartData.data.value,
         backgroundColor: function (context) {
            var value = context.dataset.data[context.dataIndex].v
            return value ? "rgba(0, 166, 135, 245)" : "rgba(235, 239, 245, 1)"
         },
         borderColor: function (context) {
            var value = context.dataset.data[context.dataIndex].v
            return value ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 1)"
         },
         borderWidth: 1,
         width: ({ chart }) => (chart.chartArea || {}).width / 30 - 1,
         height: ({ chart }) => (chart.chartArea || {}).height / 15 - 1,
      },
   ],
}))

const xLabels = [...new Set(chartData.data.value.map((d) => d.x))].sort()
const yLabels = [...new Set(chartData.data.value.map((d) => d.y))]

const options = computed(() => ({
   plugins: {
      legend: false,
      tooltip: {
         callbacks: {
            title() {
               return ""
            },
            label(context) {
               const v = context.dataset.data[context.dataIndex]
               return [v.x, v.y, v.v ? "Yes" : "No"]
            },
         },
      },
   },
   scales: {
      x: {
         type: "category",
         labels: xLabels,
         offset: true,
         // time: {
         //    unit: "day",
         //    round: "day",
         //    isoWeekday: 1,
         //    displayFormats: {
         //       day: "MMM dd",
         //    },
         // },
         ticks: {
            stepSize: 1,
            padding: 5,
         },
         grid: {
            display: false,
            drawBorder: false,
            tickLength: 0,
         },
      },
      y: {
         type: "category",
         labels: yLabels,
         offset: true,
         ticks: {
            // stepSize: 1,
            padding: 5,
         },
         grid: {
            display: false,
            drawBorder: false,
            tickLength: 0,
         },
      },
   },
   layout: {
      padding: 0,
   },
   responsive: true,
   animation: false,
}))

onMounted(() => {
   // console.log(data.value)
   // console.log(chartData.data.value)
   setupChart()
})

watch(chartData.data, (newChartData) => {
   if (chartInstance) {
      // setupChart()
      chartInstance.data.datasets[0].data = newChartData
      chartInstance.update()
   }
})

const setupChart = () =>
   (chartInstance = new Chart(canvas.value, {
      type: "matrix",
      data: data.value,
      options: options.value,
   }))

// onMounted(() => {
//    const data = chartData.data.value
//    const xLabels = [...new Set(data.map((d) => d.x))].sort()
//    const yLabels = [...new Set(data.map((d) => d.y))]
//    const config: ChartConfiguration<"matrix", typeof data, (typeof data)[0]> = {
//       type: "matrix",
//       data: {
//          datasets: [
//             {
//                label: "My Matrix",
//                data,
//                backgroundColor: function (context) {
//                   var value = (context.dataset.data[context.dataIndex] as MyMatrixDataPoint).v
//                   return value ? "rgba(0, 128, 0, 1)" : "rgba(128, 0, 0, 1)"
//                },
//                borderColor: function (context) {
//                   var value = (context.dataset.data[context.dataIndex] as MyMatrixDataPoint).v
//                   return value ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 1)"
//                },
//                borderWidth: 1,
//                width: ({ chart }) => (chart.chartArea || {}).width / 30 - 1,
//                height: ({ chart }) => (chart.chartArea || {}).height / 15 - 1,
//             },
//          ],
//       },
//       options: {
//          plugins: {
//             legend: false,
//             tooltip: {
//                callbacks: {
//                   title() {
//                      return ""
//                   },
//                   label(context) {
//                      const v = context.dataset.data[context.dataIndex]
//                      return ["x: " + v.x, "y: " + v.y, "v: " + v.v]
//                   },
//                },
//             },
//          },
//          scales: {
//             x: {
//                type: "category",
//                labels: xLabels,
//                offset: true,
//                // time: {
//                //    unit: "day",
//                //    round: "day",
//                //    isoWeekday: 1,
//                //    displayFormats: {
//                //       day: "MMM dd",
//                //    },
//                // },
//                ticks: {
//                   stepSize: 1,
//                   padding: 5,
//                },
//                grid: {
//                   display: false,
//                   drawBorder: false,
//                   tickLength: 0,
//                },
//             },
//             y: {
//                type: "category",
//                labels: yLabels,
//                offset: true,
//                ticks: {
//                   // stepSize: 1,
//                   padding: 5,
//                },
//                grid: {
//                   display: false,
//                   drawBorder: false,
//                   tickLength: 0,
//                },
//             },
//          },
//          layout: {
//             padding: 0,
//          },
//          responsive: true,
//          animation: false,
//       },
//    }

//    const chart = new Chart(canvas.value!.getContext("2d")!, config)
// })
</script>
