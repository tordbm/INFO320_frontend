<template>
  <GoogleMap
    :api-key="apiKey"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="12">
    <template v-if="locations.length > 0">
      <MarkerCluster>
        <Marker
          v-for="(location, i) in locations"
          :key="i"
          :options="{ position: location }">
          <InfoWindow v-if="information.length > 0 && information[i]">
            <h6>{{ information[i].storeType }}</h6>
            <div>{{ information[i].address }}</div>
            <a class="link" href="#"> See metrics </a>
          </InfoWindow>
        </Marker>
      </MarkerCluster>
    </template>
  </GoogleMap>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GoogleMap, InfoWindow, Marker, MarkerCluster } from 'vue3-google-map'
import { MAPS_API_KEY } from '../shared/api'

export default defineComponent({
  props: {
    locations: { type: Array<any>, required: true },
    information: { type: Array<any>, required: true },
  },
  components: {
    GoogleMap,
    Marker,
    MarkerCluster,
    InfoWindow,
  },
  data() {
    return {
      apiKey: MAPS_API_KEY,
      center: { lat: 40.7352225, lng: -73.9135952 },
    }
  },
})
</script>

<style scoped lang="scss">
h6::first-letter {
  text-transform: capitalize;
}
</style>
