<template>
  <ContentLoader v-if="loading" />
  <div class="conatiner mt-2">
    <ProductsSold v-if="!loading" :products-sold="productsSold" />
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
    this.productsSold = response
    this.$emit('reset-outlet')
    this.loading = false
  },
})
</script>
