<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Bar } from 'vue-chartjs'

export default defineComponent({
  components: {
    Bar,
  },
  props: {
    beveragesSold: { type: Object, required: true },
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
            label: 'Quantity',
            data: this.productData,
            backgroundColor: 'skyblue',
          },
        ],
      }
    },
    chartOptions() {
      return {
        plugins: {
          title: {
            display: true,
            text: 'Beverages Sold',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grace: '100%',
            beginAtZero: true,
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
      return [...Object.keys(this.dataMap)]
    },
    productData(): Array<any> {
      return [...Object.values(this.dataMap)]
    },
  },
  mounted() {
    this.dataMap = this.createDateMap()
  },
  methods: {
    createDateMap() {
      const dateMap = {}
      this.beveragesSold.forEach((item) => {
        const quantity = parseInt(item.quantitySold.value)

        if (dateMap[item.transactionDate.value] === undefined) {
          dateMap[item.transactionDate.value] = 0
        }

        dateMap[item.transactionDate.value] += quantity
      })
      return dateMap
    },
  },
})
</script>
