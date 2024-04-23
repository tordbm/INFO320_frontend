import axios from 'axios'

export const MAPS_API_KEY = 'AIzaSyDBA5mvMSp45SeYw-ARj-7hxJR3MRMkqb0'

const sparqlEndpoint = 'http://localhost:8080/sparql'

export async function fetchStoreLocations() {
  const response = await axios.get(sparqlEndpoint, {
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
  
              SELECT ?store ?lat ?long ?address ?storeType
              WHERE {
                  ?store rdf:type ex:SalesOutlet;
                      ex:store_latitude ?lat;
                      ex:store_longitude ?long;
                      ex:store_address ?address;
                      ex:store_type ?storeType .
              }
              `,
    },
  })
  return response.data
}

export async function fetchExampleData() {
  const response = await axios.get(sparqlEndpoint, {
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
  return response
}
