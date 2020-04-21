import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import GqlTypes from "./GqlTypes";
import Queries from "./Queries";
import Mutations from "./Mutations";

import type { GraphQLFieldConfigMap } from "graphql";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLFieldReturn = GraphQLFieldConfigMap<any, any>;
type Entity = Category | Product;

async function getObjectFromGlobalId(globalId, ctx): Promise<Entity> {
  const { type, id } = fromGlobalId(globalId);

  if (type === "Category") return await ctx.entityManager.findOne(Category, id);
  if (type === "Product") return await ctx.entityManager.findOne(Product, id);
  if (type === "CartItem") return ctx.session.cart.cartItems[id];
}

const { nodeInterface, nodeField } = nodeDefinitions(getObjectFromGlobalId);
const types = new GqlTypes(nodeInterface);
const { fetchCategories, searchProducts, sendContactMessage } = new Queries(
  types
);

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: (): GraphQLFieldReturn => ({
    node: nodeField,
    fetchCategories,
    searchProducts,
    sendContactMessage,
  }),
});

const {
  addProductToCart,
  removeProductFromCart,
  updateCartItemQuantity,
} = new Mutations(types);

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: (): GraphQLFieldReturn => ({
    addProductToCart,
    removeProductFromCart,
    updateCartItemQuantity,
  }),
});

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

export { schema, getObjectFromGlobalId };
