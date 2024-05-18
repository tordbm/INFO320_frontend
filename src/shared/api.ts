import axios from 'axios'

export const MAPS_API_KEY = 'AIzaSyDBA5mvMSp45SeYw-ARj-7hxJR3MRMkqb0'

const sparqlEndpoint = 'http://localhost:8080/sparql'
const PREFIX = `
              PREFIX : <http://example.org/ontology#>
              PREFIX owl: <http://www.w3.org/2002/07/owl#>
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX xml: <http://www.w3.org/XML/1998/namespace>
              PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
              PREFIX obda: <https://w3id.org/obda/vocabulary#>
              PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
              `

export async function fetchStoreLocations() {
  const response = await axios.get(sparqlEndpoint, {
    params: {
      query: `
              ${PREFIX}

              SELECT ?store ?lat ?long ?address ?storeType
              WHERE {
                  ?store rdf:type :SalesOutlet;
                      :store_latitude ?lat;
                      :store_longitude ?long;
                      :store_address ?address;
                      :store_type ?storeType .
              }
              `,
    },
  })
  return response.data
}

export async function fetchCustomerData() {
  const response = await axios.get(sparqlEndpoint, {
    params: {
      query: `
            ${PREFIX}

            SELECT ?loyalty ?email ?name (SUM(?quantity) AS ?total_quantity)
            WHERE {
              ?reciept a :Reciept;
                      :customerAppearsOn ?customer;
                      :quantity ?quantity .
              
              ?customer a :Customer;
                :customer_first_name ?name;
                :loyalty_card_number ?loyalty;
                :customer_email ?email .
              
            }
            GROUP BY ?name ?loyalty ?email
            ORDER BY DESC (?total_quantity)
            LIMIT 100
            `,
    },
  })
  return response.data.results.bindings
}

export async function fetchPastriesSold(outletId: string) {
  const filter = outletId === '*' ? '' : `FILTER (?salesOutletId = ${outletId})`

  const response = await axios.get(sparqlEndpoint, {
    params: {
      query: `
            ${PREFIX}

            SELECT ?quantitySold ?transactionDate ?salesOutletId ?productId ?productName
            WHERE {
              ?pastryInventory rdf:type :PastryInventory;
                              :transaction_date ?transactionDate;
                              :quantity_sold ?quantitySold;
                              :sales_outlet_id ?salesOutletId;
                              :productPartOf ?productId .
              
              ?productId :product ?productName .
            
                ${filter}
              }
          `,
    },
  })
  return response.data.results.bindings
}

export async function fetchBeveragesSold(outletId: string) {
  const filter =
    outletId === '*'
      ? ''
      : `
      BIND(STRAFTER(STR(?salesOutletId), "http://example.org/ontology#SalesOutlet/") AS ?salesOutletIdValue)
      FILTER (?salesOutletIdValue = \"${outletId}")
      `

  const response = await axios.get(sparqlEndpoint, {
    params: {
      query: `
            ${PREFIX}

            SELECT ?quantitySold ?transactionDate ?salesOutletId ?productId ?productType
            WHERE {
              ?reciept rdf:type :Reciept;
                              :transaction_date ?transactionDate;
                              :quantity ?quantitySold;
                              :salesOutletAppearsOn ?salesOutletId;
                              :productAppearsOn ?productId .
              
              ?productId :product_type ?productType .
            
                ${filter}
              }
              ORDER BY ?transactionDate
          `,
    },
  })
  return response.data.results.bindings
}
