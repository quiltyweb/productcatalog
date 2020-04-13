import assert from 'assert'

import { createConnection } from 'typeorm'
import { graphql } from 'graphql'
import faker from 'faker'

import loadSchema from '../../src/graphql'
import { Category } from '../../src/entity/Category'
// import { Product } from '../../src/entity/Product'

import type { Connection } from 'typeorm'
import { Product } from '../../src/entity/Product'

type ProductData = {
  category: Category;
  name: string;
  description: string;
  imagePath: string;
  attachmentPath: string;
  purchasePrice: number;
  salePrice: number;
  supplierName: string;
}

// Declaring global variables to be able to make a DB connection
// and load the GQL schema once instead of inside every 'it' function,
// because 'describe' functions can't return promises.
let connection: Connection
let schema

beforeAll(async () => {
  connection = await createConnection('test')

  // Make sure the DB is empty
  const existingCategories = await connection.manager.find(Category)
  const categoryCount = existingCategories.length
  assert(categoryCount === 0)

  const rangeCount = 5
  const range = Array(rangeCount).fill(null)

  console.log('Seeding database...')

  const categories = range.map(() => ({ name: faker.commerce.productAdjective() }))
  await connection.manager.insert(Category, categories)
  const categoryRecords = await connection.manager.find(Category)

  const products = categoryRecords.flatMap((category: Category) => range.map(() => {
    const product = new Product()

    const purchasePrice = faker.random.number({ min: 10000, max: 100000 })

    product.category =  category,
    product.name =  faker.commerce.productName(),
    product.description =  faker.lorem.paragraph(),
    product.imagePath =  faker.internet.url(),
    product.attachmentPath =  faker.internet.url(),
    product.purchasePrice =  purchasePrice,
    product.salePrice =  faker.random.number({ min: 10000, max: purchasePrice }),
    product.supplierName =  faker.company.companyName()

    return product
  }))

  await connection.manager.save(products)

  console.log('Database seeded!')

  schema = await loadSchema(connection)
})

afterAll(async done => {
  await connection.dropDatabase()
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

      expect(categories).toContainEqual(expect.objectContaining({ name: expect.any(String) }))
      expect(categories).not.toContainEqual(undefined)
    })

    it('returns associated products', async () => {
      expect.assertions(1)

      const results = await graphql(schema, query)
      const categories = results.data.fetchCategories.edges.map(catEdge => catEdge.node)

      const products = categories
        .map(cat => cat.products.edges.map(prodEdge => prodEdge.node))
        .flat(1)

      expect(products).toContainEqual(expect.objectContaining({ name: expect.any(String) }))
    })
  })
})
