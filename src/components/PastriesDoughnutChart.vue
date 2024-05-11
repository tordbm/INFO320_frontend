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
    pastriesSold: { type: Object, required: true },
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
            backgroundColor: [
              'rgb(65, 105, 225)',
              'rgb(255, 165, 0)',
              'rgb(50, 205, 50)',
              'rgb(255, 69, 0)',
              'rgb(128, 0, 128)',
            ],
          },
        ],
      }
    },
    chartOptions() {
      return {
        plugins: {
          title: {
            display: true,
            text: 'Pastries Sold',
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
      this.pastriesSold.forEach((item) => {
        const quantity = parseInt(item.quantitySold.value)

        if (dateMap[item.productName.value] === undefined) {
          dateMap[item.productName.value] = 0
        }

        dateMap[item.productName.value] += quantity
      })
      return dateMap
    },
  },
})
</script>
