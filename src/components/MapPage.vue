<template>
  <GoogleMap
    :api-key="apiKey"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="12">
    <MarkerCluster>
      <Marker
        v-for="(location, i) in locations"
        :key="i"
        :options="{ position: location }">
        <InfoWindow> Hello </InfoWindow>
      </Marker>
    </MarkerCluster>
  </GoogleMap>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { GoogleMap, InfoWindow, Marker, MarkerCluster } from 'vue3-google-map'
import { MAPS_API_KEY, queryUrl } from '../shared/api'

export default defineComponent({
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
      locations: [],
      information: [],
    }
  },
  async mounted() {
    const response = await axios.get(queryUrl, {
      params: {
        query: `
            PREFIX : <http://example.org/ontology#Ontology#>
            PREFIX ex: <http://example.org/ontology#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX obda: <https://w3id.org/obda/vocabulary#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

            SELECT ?store ?lat ?long
            WHERE {
                ?store rdf:type ex:SalesOutlet;
                    ex:store_latitude ?lat;
                    ex:store_longitude ?long .
            }
            `,
      },
    })
    response.data.results.bindings.forEach((item) => {
      this.information.push({})
      this.locations.push({
        lat: parseFloat(item.lat.value),
        lng: parseFloat(item.long.value),
      })
    })
    console.log(this.locations)
  },
})
</script>
