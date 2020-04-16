import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay'
import { Connection as DbConnection } from 'typeorm'

import { Category } from '../entity/Category'
import { Product } from '../entity/Product'

import type { GraphQLFieldConfigMap } from 'graphql'
import type { Connection } from 'graphql-relay'

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLFieldReturn = GraphQLFieldConfigMap<any, any>

async function loadSchema(connection: DbConnection): Promise<GraphQLSchema> {
  const entityManager = connection.manager

  const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
      const { type, id } = fromGlobalId(globalId)

      if (type === 'Category') return entityManager.findOne(Category, id)
      if (type === 'Product') return entityManager.findOne(Product, id)
    },
    obj => {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      if (obj.constructor.name == 'Category') return categoryType
      if (obj.constructor.name == 'Product') return productType
      /* eslint-enable @typescript-eslint/no-use-before-define */
    }
  )


  const productType = new GraphQLObjectType({
    name: 'Product',
    interfaces: [nodeInterface],
    fields: (): GraphQLFieldReturn => ({
      id: globalIdField(),
      name: { type: GraphQLString },
      description: {
        type: GraphQLString,
        description: 'Detailed description of the product.'
      },
      imagePath: {
        type: GraphQLString,
        description: 'Path to an image file for the product.'
      },
      attachmentPath: {
        type: GraphQLString,
        description: 'Path to an attachment file (usually a PDF) for the product.'
      },
      purchasePrice: {
        type: GraphQLInt,
        description: 'Price at which the store buys the product.'
      },
      salePrice: {
        type: GraphQLInt,
        description: 'Price at which the store sells the product.'
      },
      supplierName: {
        type: GraphQLString,
        description: 'Name or RUT of the supplier of the product.'
      }
    })
  })

  const productConnectionType = connectionDefinitions({ nodeType: productType }).connectionType

  async function resolveProducts(category, args): Promise<Connection<Product>> {
    const products = await category.products
    return connectionFromArray(products, args)
  }

  const categoryType = new GraphQLObjectType({
    name: 'Category',
    interfaces: [nodeInterface],
    fields: (): GraphQLFieldReturn => ({
      id: globalIdField(),
      name: { type: GraphQLString },
      products: {
        type: productConnectionType,
        description: 'The products that belong to the category.',
        args: connectionArgs,
        resolve: resolveProducts
      },
    })
  })

  const categoryConnectionType = connectionDefinitions({ nodeType: categoryType }).connectionType

  async function resolveFetchCategories(root, args): Promise<Connection<Category>> {
    const categories = await entityManager.find(Category, { relations: ['products'] })
    return connectionFromArray(categories, args)
  }

  async function resolveSearchProducts(root, args): Promise<Connection<Product>> {
    const { searchTerm } = args
    const products = await entityManager
      .createQueryBuilder(Product, 'products')
      // Need to put the whole LIKE string in the variable due to how typeorm
      // handles interpolation
      .where(
        "LOWER(products.name) LIKE :searchTerm",
        { searchTerm: `%${searchTerm.toLowerCase()}%` }
      )
      .getMany()

    return connectionFromArray(products, args)
  }

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: (): GraphQLFieldReturn => ({
      node: nodeField,
      fetchCategories: {
        type: categoryConnectionType,
        args: connectionArgs,
        resolve: resolveFetchCategories,
      },
      searchProducts: {
        type: productConnectionType,
        args: {
          searchTerm: {
            type: GraphQLString,
            description: `
              Search term to use to match products in the DB.
              Matches on name only, converting the search and the names
              to lowercase.
            `,
          },
          ...connectionArgs
        },
        resolve: resolveSearchProducts,
      }
    })
  })

  return new GraphQLSchema({ query: queryType })
}

export default loadSchema
