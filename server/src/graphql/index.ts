import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { nodeDefinitions, fromGlobalId } from "graphql-relay";
import { Category, PrismaClient, Product } from '@prisma/client'

import GqlTypes from "./GqlTypes";
import Queries from "./Queries";

import type { GraphQLFieldConfigMap } from "graphql";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLFieldReturn = GraphQLFieldConfigMap<any, any>;
type Entity = Category | Product;


const prisma = new PrismaClient()


async function getObjectFromGlobalId(globalId: string): Promise<Entity> {
  const { type, id } = fromGlobalId(globalId);

  if (type === "Category") return await prisma.category.findUnique({where: {id: parseInt(id)}});
  if (type === "Product") return await prisma.product.findUnique({where: {id: parseInt(id)}});
}

const { nodeInterface, nodeField } = nodeDefinitions(getObjectFromGlobalId);
const types = new GqlTypes(nodeInterface);
const {
  fetchCategories,
  fetchCategory,
  searchProducts,
  fetchProduct,
  sendContactMessage,
  sendQuoteRequest,
} = new Queries(types);

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: (): GraphQLFieldReturn => ({
    node: nodeField,
    fetchCategories,
    fetchCategory,
    searchProducts,
    fetchProduct,
    sendContactMessage,
    sendQuoteRequest,
  }),
});

const schema = new GraphQLSchema({ query: queryType });

export { schema, getObjectFromGlobalId };
