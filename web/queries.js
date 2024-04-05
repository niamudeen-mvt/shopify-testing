const CREATE_PRODUCTS_MUTATION = `
        mutation populateProduct($input: ProductInput!) {
          productCreate(input: $input) {
            product {
              id
            }
          }
        }
`

export const createProduct = (client, { aliexpressId, ...input }) => {
  return client.query({
    data: {
      query: CREATE_PRODUCTS_MUTATION,
      variables: {
        input: {
          ...input,
          metafields: {
            namespace: '$app:aliexpress',
            type: 'single_line_text_field',
            key: '_id',
            value: aliexpressId,
          },
        },
      },
    },
  })
}

const CREATE_METAFIELD_DEFINITION = `
mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
    }
    userErrors {
      field
      message
      code
    }
  }
}
`

export const createMetafieldDefinition = (client, definition) => {
  return client.query({
    data: {
      query: CREATE_METAFIELD_DEFINITION,
      variables: {
        definition,
      },
    },
  })
}

const STORE_DETAILS = `
query {
  shop {
    name
    currencyCode
  }
}
`

export const getStoreDetails = client => {
  return client.query({
    data: {
      query: STORE_DETAILS,
    },
  })
}

const FIRST_STORE_LOCATION = `
query {
  locations(first:1) {
    edges {
      node{
        id
      }
    }
  }
}
`

export const getStoreLocation = client => {
  return client.query({
    data: {
      query: FIRST_STORE_LOCATION,
    },
  })
}
