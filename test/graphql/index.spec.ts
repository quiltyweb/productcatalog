import { createConnection, getConnection } from 'typeorm'
import { graphql } from 'graphql'

import loadSchema from '../../src/graphql'

// Declaring global variables to be able to make a DB connection
// and load the GQL schema once instead of inside every 'it' function,
// because 'describe' functions can't return promises.
let connection
let schema

beforeAll(async () => {
  connection = await createConnection()
  schema = await loadSchema(connection)
})

afterAll(done => {
  connection.close()
  done()
})

describe('GraphQL schema', () => {
  describe('fetchCategories', () => {
    const query = `
      query {
        fetchCategories {
          edges {
            node {
              name
              products {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `

    it('returns category fields', async () => {
      expect.assertions(2)

      const results = await graphql(schema, query)
      const categories = results.data.fetchCategories.edges.map(catEdge => catEdge.node)

      expect(categories).toContainEqual(expect.objectContaining({ name: expect.any(String)}))
      expect(categories).not.toContainEqual(undefined)
    })

    it('returns associated products', async () => {
      expect.assertions(1)

      const results = await graphql(schema, query)
      const categories = results.data.fetchCategories.edges.map(catEdge => catEdge.node)

      const products = categories.map(cat => {
        return cat.products.edges.map(prodEdge => prodEdge.node)
      }).flat(1)

      expect(products).toContainEqual(expect.objectContaining({ name: expect.any(String)}))
    })
  })
})
