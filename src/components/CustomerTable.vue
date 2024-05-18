<template>
  <ContentLoader v-if="loading" />
  <table class="table table-hover mt-4 center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Products Bought</th>
        <th>Loyalty Number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in response">
        <td>{{ item.name.value }}</td>
        <td>{{ item.email.value }}</td>
        <td>{{ item.total_quantity.value }}</td>
        <td>{{ item.loyalty.value }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { fetchCustomerData } from '../shared/api'
import ContentLoader from './ContentLoader.vue'

export default defineComponent({
  components: {
    ContentLoader,
  },
  data() {
    return {
      response: null as any,
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    const response = await fetchCustomerData()
    this.response = response
    this.loading = false
  },
})
</script>
