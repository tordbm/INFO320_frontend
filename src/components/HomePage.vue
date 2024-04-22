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
  <MapPage class="mt-3" v-if="mode === 'OutletMap'" />
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
import axios from 'axios'
import ContentLoader from './ContentLoader.vue'
import MapPage from './MapPage.vue'
import { queryUrl } from '../shared/api'

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
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      const response = await axios
        .get(queryUrl, {
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

            SELECT ?staff ?lastname
            WHERE {
            ?staff rdf:type ex:Staff .
            ?staff ex:last_name ?lastname .
            }
            LIMIT 50

            `,
          },
        })
        .finally()
      this.response = response
      this.loading = false
    },
    parseURI(uri: string): string {
      return '' + uri.match(/[^/]*$/)
    },
  },
})
</script>
<style scoped lang="scss">
th::first-letter {
  text-transform: capitalize;
}
</style>
