<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a v-if="mode === 'OutletMap'" class="nav-link active">Sales Outlets</a>
      <a v-else class="nav-link" @click="mode = 'OutletMap'">Sales Outlets</a>
    </li>
    <li class="nav-item">
      <a v-if="mode === 'LoyaltyTable'" class="nav-link active"
        >Loyal Customers</a
      >
      <a v-else class="nav-link" @click="mode = 'LoyaltyTable'"
        >Loyal Customers</a
      >
    </li>
    <li class="nav-item">
      <a v-if="mode === 'OutletStats'" class="nav-link active">Outlet Stats</a>
      <a v-else class="nav-link" @click="mode = 'OutletStats'">Outlet Stats</a>
    </li>
  </ul>
  <ContentLoader v-if="loading" />
  <MapPage
    v-if="mode === 'OutletMap' && !loading"
    :loading="loading"
    :locations="locations"
    :information="information"
    @metrics="seeStoreMetrics"
    class="mt-3" />
  <CustomerTable v-if="mode === 'LoyaltyTable' && !loading" />
  <div v-if="!loading && mode === 'OutletStats'">
    <ChartOverview
      :outlet-id="outletId"
      :information="information"
      @reset-outlet="outletId = '*'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentLoader from './ContentLoader.vue'
import MapPage from './MapPage.vue'
import ChartOverview from './ChartOverview.vue'
import { fetchStoreLocations } from '../shared/api'
import { parseURI } from '../shared/utils'
import CustomerTable from './CustomerTable.vue'

export default defineComponent({
  components: {
    ContentLoader,
    MapPage,
    ChartOverview,
    CustomerTable,
  },
  data() {
    return {
      response: null as any,
      loading: false,
      mode: 'OutletMap' as string,
      locations: [] as any[],
      information: [] as any[],
      outletId: '*' as string,
    }
  },
  async mounted() {
    this.loading = true
    const response = await fetchStoreLocations()
    response.results.bindings.forEach(
      (item: {
        address: { value: any }
        storeType: { value: any }
        store: { value: string }
        lat: { value: string }
        long: { value: string }
      }) => {
        this.information.push({
          address: item.address.value,
          storeType: item.storeType.value,
          storeId: parseURI(item.store.value),
        })
        this.locations.push({
          lat: parseFloat(item.lat.value),
          lng: parseFloat(item.long.value),
        })
      }
    )
    this.loading = false
  },
  methods: {
    seeStoreMetrics(outletId: string) {
      this.outletId = outletId
      this.mode = 'OutletStats'
    },
    parseURI,
  },
})
</script>
<style scoped lang="scss">
th::first-letter {
  text-transform: capitalize;
}
</style>
