<template>
  <button class="btn btn-light" @click="fetchData">Show your mom</button>
  <div v-if="response && !loading">
    {{ response.data }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

const queryUrl = 'http://localhost:8080/sparql'

export default defineComponent({
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

            SELECT ?person ?gender
            WHERE {
            ?person rdf:type ex:Customer .
            ?person ex:gender ?gender .
            }
            `,
        },
      })
      console.log(response)
      this.response = response
      this.loading = false
    },
  },
})
</script>
