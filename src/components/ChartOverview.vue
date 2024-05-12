<template>
  <ContentLoader v-if="loading" />
  <div
    v-if="pastriesSold.length === 0 && beveragesSold.length === 0 && !loading"
    class="alert alert-warning mt-2"
    role="alert">
    No data found for selected store
  </div>

  <div class="row">
    <div class="col">
      <select
        v-model="salesOutletId"
        class="form-select mt-2"
        aria-label="store-select"
        :disabled="loading">
        <option :value="'*'">Show All</option>
        <option v-for="options in information" :value="options.storeId">
          {{ options.storeType + ': ' + options.address }}
        </option>
      </select>
      <div v-if="pastriesSold.length > 0 && !loading" class="container mt-2">
        <PastriesSoldChart :pastries-sold="pastriesSold" />
        <PastriesDoughnutChart class="mt-2" :pastries-sold="pastriesSold" />
      </div>
    </div>
    <div class="col">
      <select
        class="form-select mt-2"
        aria-label="month-select"
        :disabled="loading">
        <option :value="'04'">April</option>
      </select>
      <div v-if="beveragesSold.length > 0 && !loading" class="container mt-2">
        <BeveragesSoldChart :beverages-sold="beveragesSold" />
        <BeveragesDoughnutChart class="mt-2" :beverages-sold="beveragesSold" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PastriesSoldChart from './PastriesSoldChart.vue'
import { fetchBeveragesSold, fetchPastriesSold } from '../shared/api'
import ContentLoader from './ContentLoader.vue'
import PastriesDoughnutChart from './PastriesDoughnutChart.vue'
import BeveragesSoldChart from './BeveragesSoldChart.vue'
import BeveragesDoughnutChart from './BeveragesDoughnutChart.vue'

export default defineComponent({
  emits: ['reset-outlet'],
  components: {
    PastriesSoldChart,
    PastriesDoughnutChart,
    BeveragesSoldChart,
    BeveragesDoughnutChart,
    ContentLoader,
  },
  props: {
    outletId: { type: String, required: true },
    information: { type: Object, required: true },
  },
  data() {
    return {
      pastriesSold: [] as any[],
      beveragesSold: [] as any[],
      loading: false,
      salesOutletId: this.outletId,
    }
  },
  watch: {
    async salesOutletId() {
      this.loading = true
      await this.fetchProducts()
      this.loading = false
    },
  },
  async mounted() {
    this.loading = true
    await this.fetchProducts()
    this.$emit('reset-outlet')
    this.loading = false
  },
  methods: {
    async fetchProducts() {
      const responsePastries = await fetchPastriesSold(this.salesOutletId)
      const responseBeverages = await fetchBeveragesSold(this.salesOutletId)
      this.pastriesSold = responsePastries
      this.beveragesSold = responseBeverages
    },
  },
})
</script>
