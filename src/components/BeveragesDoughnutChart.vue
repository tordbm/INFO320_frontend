<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Doughnut } from 'vue-chartjs'

export default defineComponent({
  components: {
    Doughnut,
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
            backgroundColor: this.colors,
          },
        ],
      }
    },
    colors() {
      console.log(this.labels.length)
      return [
        'rgb(255, 99, 132)', // Red
        'rgb(54, 162, 235)', // Blue
        'rgb(255, 205, 86)', // Yellow
        'rgb(75, 192, 192)', // Green
        'rgb(153, 102, 255)', // Purple
        'rgb(255, 159, 64)', // Orange
        'rgb(255, 0, 255)', // Magenta
        'rgb(0, 255, 255)', // Cyan
        'rgb(255, 140, 0)', // Dark Orange
        'rgb(0, 128, 128)', // Teal
      ]
    },
    chartOptions() {
      return {
        plugins: {
          title: {
            display: true,
            text: 'Beverage Types Sold',
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

        if (dateMap[item.productType.value] === undefined) {
          dateMap[item.productType.value] = 0
        }

        dateMap[item.productType.value] += quantity
      })
      return dateMap
    },
  },
})
</script>
