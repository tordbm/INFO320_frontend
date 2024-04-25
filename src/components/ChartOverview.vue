<template>
  <ContentLoader v-if="loading" />
  <div class="conatiner">
    <ProductsSold v-if="!loading" :products-sold="productsSold" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ProductsSold from './ProductsSold.vue'
import { fetchProductsSold } from '../shared/api'
import ContentLoader from './ContentLoader.vue'

export default defineComponent({
  components: {
    ProductsSold,
    ContentLoader,
  },
  props: {
    outletId: { type: String, required: true },
  },
  data() {
    return {
      productsSold: [] as any[],
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    const response = await fetchProductsSold(this.outletId)
    this.productsSold = response.data.results.bindings
    this.loading = false
  },
})
</script>
