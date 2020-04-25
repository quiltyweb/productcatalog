import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from "graphql-relay";

import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { CartItem } from "../entity/Cart";

import type { GraphQLFieldConfigMap, GraphQLInterfaceType } from "graphql";
import type { Connection } from "graphql-relay";

import type { TSource, TContext } from "../types";

class GqlTypes {
  public productType: GraphQLObjectType;
  public productConnectionType: GraphQLObjectType;
  public categoryType: GraphQLObjectType;
  public categoryConnectionType: GraphQLObjectType;

  public sendMessageResponseType: GraphQLObjectType;

  public cartItemType: GraphQLObjectType;
  public cartItemConnectionType: GraphQLObjectType;
  public cartType: GraphQLObjectType;

  constructor(nodeInterface: GraphQLInterfaceType) {
    this.productType = this.buildProductType(nodeInterface);
    this.productConnectionType = this.buildProductConnectionType(
      this.productType
    );
    this.categoryType = this.buildCategoryType(
      nodeInterface,
      this.productConnectionType
    );
    this.categoryConnectionType = this.buildCategoryConnectionType(
      this.categoryType
    );

    this.sendMessageResponseType = this.buildSendMessageResponseType();

    this.cartItemType = this.buildCartItemType(nodeInterface, this.productType);
    this.cartItemConnectionType = this.buildCartItemConnectionType(
      this.cartItemType
    );
    this.cartType = this.buildCartType(this.cartItemConnectionType);
  }

  private buildProductType(
    nodeInterface: GraphQLInterfaceType
  ): GraphQLObjectType {
    return new GraphQLObjectType({
      name: "Product",
      interfaces: [nodeInterface],
      isTypeOf: (obj): boolean => obj instanceof Product,
      fields: (): GraphQLFieldConfigMap<TSource, TContext> => ({
        id: globalIdField(),
        name: { type: GraphQLNonNull(GraphQLString) },
        description: {
          type: GraphQLNonNull(GraphQLString),
          description: "Detailed description of the product.",
        },
        imagePath: {
          type: GraphQLNonNull(GraphQLString),
          description: "Path to an image file for the product.",
        },
        attachmentPath: {
          type: GraphQLNonNull(GraphQLString),
          description:
            "Path to an attachment file (usually a PDF) for the product.",
        },
        purchasePrice: {
          type: GraphQLNonNull(GraphQLInt),
          description: "Price at which the store buys the product.",
        },
        salePrice: {
          type: GraphQLNonNull(GraphQLInt),
          description: "Price at which the store sells the product.",
        },
        supplierName: {
          type: GraphQLNonNull(GraphQLString),
          description: "Name or RUT of the supplier of the product.",
        },
      }),
    });
  }

  private buildProductConnectionType(
    productType: GraphQLObjectType
  ): GraphQLObjectType {
    return connectionDefinitions({ nodeType: productType }).connectionType;
  }

  private buildCategoryType(
    nodeInterface: GraphQLInterfaceType,
    productConnectionType: GraphQLObjectType
  ): GraphQLObjectType {
    return new GraphQLObjectType({
      name: "Category",
      interfaces: [nodeInterface],
      isTypeOf: (obj): boolean => obj instanceof Category,
      fields: (): GraphQLFieldConfigMap<TSource, TContext> => ({
        id: globalIdField(),
        name: { type: GraphQLNonNull(GraphQLString) },
        products: {
          type: GraphQLNonNull(productConnectionType),
          description: "The products that belong to the category.",
          args: connectionArgs,
          resolve: async (category, args): Promise<Connection<Product>> => {
            const products = await category.products;
            return connectionFromArray(products, args);
          },
        },
      }),
    });
  }

  private buildCategoryConnectionType(
    categoryType: GraphQLObjectType
  ): GraphQLObjectType {
    return connectionDefinitions({
      nodeType: categoryType,
    }).connectionType;
  }

  buildSendMessageResponseType(): GraphQLObjectType {
    const messageStatusEnum = new GraphQLEnumType({
      name: "MessageStatus",
      values: {
        SUCCESS: { value: "success" },
        FAILURE: { value: "failure" },
      },
    });

    return new GraphQLObjectType({
      name: "SendMessageResponse",
      fields: (): GraphQLFieldConfigMap<TSource, TContext> => ({
        status: {
          type: messageStatusEnum,
        },
        message: {
          type: GraphQLNonNull(GraphQLString),
        },
      }),
    });
  }

  buildCartItemType(
    nodeInterface: GraphQLInterfaceType,
    productType: GraphQLObjectType
  ): GraphQLObjectType {
    return new GraphQLObjectType({
      name: "CartItem",
      interfaces: [nodeInterface],
      isTypeOf: (obj): boolean => obj instanceof CartItem,
      fields: (): GraphQLFieldConfigMap<TSource, TContext> => ({
        id: globalIdField(),
        product: {
          type: GraphQLNonNull(productType),
        },
        quantity: {
          type: GraphQLNonNull(GraphQLInt),
        },
      }),
    });
  }

  buildCartItemConnectionType(
    cartItemType: GraphQLObjectType
  ): GraphQLObjectType {
    return connectionDefinitions({
      nodeType: cartItemType,
    }).connectionType;
  }

  buildCartType(cartItemConnectionType: GraphQLObjectType): GraphQLObjectType {
    return new GraphQLObjectType({
      name: "Cart",
      fields: (): GraphQLFieldConfigMap<TSource, TContext> => ({
        cartItems: {
          type: GraphQLNonNull(cartItemConnectionType),
          args: connectionArgs,
          resolve: (cart, args): Connection<CartItem> =>
            connectionFromArray(cart.cartItems, args),
        },
      }),
    });
  }
}

export default GqlTypes;
