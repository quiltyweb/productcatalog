import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
} from "graphql";
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from "graphql-relay";

import { Product } from "../entity/Product";
import { Category } from "../entity/Category";

import type {
  GraphQLFieldConfigMap,
  GraphQLInterfaceType,
  GraphQLInputFieldConfigMap,
} from "graphql";
import type { Connection } from "graphql-relay";

import type { TSource, TContext } from "./types";

class GqlTypes {
  public quoteRequestInputType: GraphQLInputObjectType;
  public sendMessageResponseType: GraphQLObjectType;

  public productType: GraphQLObjectType;
  public productConnectionType: GraphQLObjectType;
  public categoryType: GraphQLObjectType;
  public categoryConnectionType: GraphQLObjectType;

  constructor(nodeInterface: GraphQLInterfaceType) {
    this.quoteRequestInputType = this.buildQuoteRequestInputType();
    this.sendMessageResponseType = this.buildSendMessageResponseType();

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
  }

  private buildQuoteRequestInputType(): GraphQLInputObjectType {
    return new GraphQLInputObjectType({
      name: "QuoteRequestInput",
      description: "Input object for sending quote requests.",
      fields: (): GraphQLInputFieldConfigMap => ({
        personalDetails: {
          type: new GraphQLNonNull(this.personalDetailsForQuoteInputType),
        },
        productsToQuote: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(this.productToQuoteInputType))
          ),
        },
      }),
    });
  }

  private get personalDetailsForQuoteInputType(): GraphQLInputObjectType {
    return new GraphQLInputObjectType({
      name: "PersonalDetailsForQuoteInput",
      description: "Personal details sent with a quote request.",
      fields: (): GraphQLInputFieldConfigMap => ({
        personalIdNumber: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The ID number of the sender, typically their RUT.",
        },
        emailAddress: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The sender's email address.",
        },
        message: {
          type: GraphQLString,
          description: "The message body to be sent.",
        },
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The sender's name.",
        },
        companyName: {
          type: GraphQLString,
          description: "The name of the sender's company.",
        },
        phoneNumber: {
          type: GraphQLString,
          description: "The senders' phone number.",
        },
        city: {
          type: GraphQLString,
          description: "The sender's home city.",
        },
      }),
    });
  }

  private get productToQuoteInputType(): GraphQLInputObjectType {
    return new GraphQLInputObjectType({
      name: "ProductsToQuoteInput",
      description:
        "A list of product IDs and quantities that the user wants quoted.",
      fields: (): GraphQLInputFieldConfigMap => ({
        productId: {
          type: GraphQLID,
          description: "ID of the product to be quoted.",
        },
        quantity: {
          type: GraphQLInt,
          description: "Quantity of the product to be quoted.",
        },
      }),
    });
  }

  private buildSendMessageResponseType(): GraphQLObjectType {
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
          type: new GraphQLNonNull(GraphQLString),
        },
      }),
    });
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Detailed description of the product.",
        },
        imagePath: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Path to an image file for the product.",
        },
        attachmentPath: {
          type: new GraphQLNonNull(GraphQLString),
          description:
            "Path to an attachment file (usually a PDF) for the product.",
        },
        purchasePrice: {
          type: new GraphQLNonNull(GraphQLInt),
          description: "Price at which the store buys the product.",
        },
        salePrice: {
          type: new GraphQLNonNull(GraphQLInt),
          description: "Price at which the store sells the product.",
        },
        supplierName: {
          type: new GraphQLNonNull(GraphQLString),
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        products: {
          type: new GraphQLNonNull(productConnectionType),
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
}

export default GqlTypes;
