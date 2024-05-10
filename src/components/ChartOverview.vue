<template>
  <ContentLoader v-if="loading" />
  <div class="row">
    <div class="col">
      <select
        v-model="salesOutletId"
        class="form-select mt-2"
        aria-label="store-select"
        :disabled="loading">
        <option v-for="options in information" :value="options.storeId">
          {{ options.address }}
        </option>
      </select>
      <div class="container mt-2">
        <ProductsSold v-if="!loading" :products-sold="productsSold" />
      </div>
    </div>
    <div class="col"></div>
    Hello
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ProductsSold from './ProductsSold.vue'
import { fetchProductsSold } from '../shared/api'
import ContentLoader from './ContentLoader.vue'

export default defineComponent({
  emits: ['reset-outlet'],
  components: {
    ProductsSold,
    ContentLoader,
  },
  props: {
    outletId: { type: String, required: true },
    information: { type: Object, required: true },
  },
  data() {
    return {
      productsSold: [] as any[],
      loading: false,
      salesOutletId: this.outletId,
    }
  },
  watch: {
    async salesOutletId(newVal) {
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
      const response = await fetchProductsSold(this.salesOutletId)
      this.productsSold = response
    },
  },
})
</script>
