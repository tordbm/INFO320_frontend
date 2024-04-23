<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a v-if="mode === 'OutletMap'" class="nav-link active">Sales Outlets</a>
      <a v-else class="nav-link" @click="mode = 'OutletMap'">Sales Outlets</a>
    </li>
    <li class="nav-item">
      <a v-if="mode === 'ShowStats'" class="nav-link active">Show Stats</a>
      <a v-else class="nav-link" @click="mode = 'ShowStats'">Show Stats</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
        >Disabled</a
      >
    </li>
  </ul>
  <ContentLoader v-if="loading" />
  <MapPage
    v-if="mode === 'OutletMap' && !loading"
    :locations="locations"
    :information="information"
    class="mt-3" />
  <button v-if="mode === 'ShowStats'" class="btn btn-light" @click="fetchData">
    Show Stats
  </button>
  <div v-if="response && !loading && mode === 'ShowStats'">
    <table class="table table-hover mt-2 center">
      <thead>
        <tr>
          <th>{{ response.data.head.vars[0] + ' id' }}</th>
          <th>{{ response.data.head.vars[1] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in response.data.results.bindings">
          <td>{{ parseURI(item.staff.value) }}</td>
          <td>{{ item.lastname.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentLoader from './ContentLoader.vue'
import MapPage from './MapPage.vue'
import { fetchExampleData, fetchStoreLocations } from '../shared/api'

export default defineComponent({
  components: {
    ContentLoader,
    MapPage,
  },
  data() {
    return {
      response: null as any,
      loading: false,
      mode: 'OutletMap' as string,
      locations: [] as any[],
      information: [] as any[],
    }
  },
  async mounted() {
    this.loading = true
    const response = await fetchStoreLocations()
    response.results.bindings.forEach((item) => {
      this.information.push({
        address: item.address.value,
        storeType: item.storeType.value,
      })
      this.locations.push({
        lat: parseFloat(item.lat.value),
        lng: parseFloat(item.long.value),
      })
    })
    this.loading = false
  },
  methods: {
    async fetchData() {
      this.loading = true
      const response = await fetchExampleData()
      this.response = response
      this.loading = false
    },
    parseURI(uri: string): string {
      const matchResult = uri.match(/[^/]*$/)
      if (matchResult) {
        return matchResult[0]
      } else {
        return ''
      }
    },
  },
})
</script>
<style scoped lang="scss">
th::first-letter {
  text-transform: capitalize;
}
</style>
