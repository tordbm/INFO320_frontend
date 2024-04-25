<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Line } from 'vue-chartjs'

export default defineComponent({
  components: {
    Line,
  },
  props: {
    productsSold: { type: Object, required: true },
  },
  data() {
    return {
      dataMap: {},
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Products Sold in April',
            data: this.productData,
            backgroundColor: 'blue',
            borderColor: 'blue',
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      }
    },
    chartOptions() {
      return {
        /*  aspectRatio: 2, */
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grace: '100%',
            grid: {
              display: true,
            },
          },
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
      }
    },
    labels(): Array<string> {
      const dateMap = {}
      this.productsSold.forEach((item) => {
        const date = item.transactionDate.value
        const quantity = parseInt(item.quantitySold.value)

        if (dateMap[date] === undefined) {
          dateMap[date] = 0
        }
        dateMap[date] += quantity
      })
      return [...Object.keys(dateMap).sort()]
    },
    productData(): Array<any> {
      const dateMap = {}
      this.productsSold.forEach((item) => {
        const date = item.transactionDate.value
        const quantity = parseInt(item.quantitySold.value)

        if (dateMap[date] === undefined) {
          dateMap[date] = 0
        }
        dateMap[date] += quantity
      })
      return [...Object.values(dateMap)]
    },
  },
})
</script>
