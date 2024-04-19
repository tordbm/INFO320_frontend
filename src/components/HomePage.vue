<template>
  <button class="btn btn-light" @click="fetchData">Show Stats</button>
  <ContentLoader v-if="loading" />
  <div v-if="response && !loading">
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

const queryUrl = 'http://localhost:8080/sparql'

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
  methods: {
    async fetchData() {
      this.loading = true
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

            SELECT ?staff ?lastname
            WHERE {
            ?staff rdf:type ex:Staff .
            ?staff ex:last_name ?lastname .
            }
            LIMIT 50
            
            `,
        },
      })
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
