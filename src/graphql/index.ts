import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
} from "graphql";
import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  mutationWithClientMutationId,
} from "graphql-relay";
import { Connection as DbConnection } from "typeorm";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";

import type { GraphQLFieldConfigMap } from "graphql";
import type { Connection } from "graphql-relay";

import type { SendEmailResponse } from "../types";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLFieldReturn = GraphQLFieldConfigMap<any, any>;
type Entity = Category | Product;
type CartItem = {
  product: Product;
  quantity: number;
};

declare interface Cart {
  items: Array<CartItem>;
}

async function loadSchema(connection: DbConnection): Promise<GraphQLSchema> {
  const entityManager = connection.manager;

  const getObjectFromGlobalId = async (globalId): Promise<Entity> => {
    const { type, id } = fromGlobalId(globalId);

    if (type === "Category") return await entityManager.findOne(Category, id);
    if (type === "Product") return await entityManager.findOne(Product, id);
  };

  const { nodeInterface, nodeField } = nodeDefinitions(
    getObjectFromGlobalId,
    (obj) => {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      if (obj.constructor.name == "Category") return categoryType;
      if (obj.constructor.name == "Product") return productType;
      /* eslint-enable @typescript-eslint/no-use-before-define */
    }
  );

  const productType = new GraphQLObjectType({
    name: "Product",
    interfaces: [nodeInterface],
    fields: (): GraphQLFieldReturn => ({
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

  const productConnectionType = connectionDefinitions({ nodeType: productType })
    .connectionType;

  async function resolveProducts(category, args): Promise<Connection<Product>> {
    const products = await category.products;
    return connectionFromArray(products, args);
  }

  const categoryType = new GraphQLObjectType({
    name: "Category",
    interfaces: [nodeInterface],
    fields: (): GraphQLFieldReturn => ({
      id: globalIdField(),
      name: { type: GraphQLNonNull(GraphQLString) },
      products: {
        type: GraphQLNonNull(productConnectionType),
        description: "The products that belong to the category.",
        args: connectionArgs,
        resolve: resolveProducts,
      },
    }),
  });

  const categoryConnectionType = connectionDefinitions({
    nodeType: categoryType,
  }).connectionType;

  async function resolveFetchCategories(
    root,
    args
  ): Promise<Connection<Category>> {
    const categories = await entityManager.find(Category, {
      relations: ["products"],
    });
    return connectionFromArray(categories, args);
  }

  async function resolveSearchProducts(
    root,
    args
  ): Promise<Connection<Product>> {
    const { searchTerm } = args;
    const products = await entityManager
      .createQueryBuilder(Product, "products")
      // Need to put the whole LIKE string in the variable due to how typeorm
      // handles interpolation
      .where("LOWER(products.name) LIKE :searchTerm", {
        searchTerm: `%${searchTerm.toLowerCase()}%`,
      })
      .getMany();

    return connectionFromArray(products, args);
  }

  const messageStatusEnum = new GraphQLEnumType({
    name: "MessageStatus",
    values: {
      SUCCESS: { value: "success" },
      FAILURE: { value: "failure" },
    },
  });

  const sendMessageResponseType = new GraphQLObjectType({
    name: "SendMessageResponse",
    fields: (): GraphQLFieldReturn => ({
      status: {
        type: messageStatusEnum,
      },
      message: {
        type: GraphQLNonNull(GraphQLString),
      },
    }),
  });

  async function resolveSendContactMessage(
    root,
    args,
    context
  ): Promise<SendEmailResponse> {
    const { personalIdNumber, emailAddress, message, name, phoneNumber } = args;

    const emailTo = process.env.ADMIN_EMAIL || "";
    const hostname = process.env.HOSTNAME || "";

    const emailMessage = `
      Nombre: ${name}
      RUT: ${personalIdNumber}
      Email: ${emailAddress}
      Número de Teléfono: ${phoneNumber}
      Mensaje: ${message}
    `;

    const emailOptions = {
      to: emailTo,
      from: `contacto@${hostname}`,
      subject: "Mensaje de Contacto",
      text: emailMessage,
    };

    const response = await context.sendEmail(emailOptions);

    return response;
  }

  const queryType = new GraphQLObjectType({
    name: "Query",
    fields: (): GraphQLFieldReturn => ({
      node: nodeField,
      fetchCategories: {
        type: GraphQLNonNull(categoryConnectionType),
        args: connectionArgs,
        resolve: resolveFetchCategories,
      },
      searchProducts: {
        type: GraphQLNonNull(productConnectionType),
        args: {
          searchTerm: {
            type: GraphQLNonNull(GraphQLString),
            description: `
              Search term to use to match products in the DB.
              Matches on name only, converting the search and the names
              to lowercase.
            `,
          },
          ...connectionArgs,
        },
        resolve: resolveSearchProducts,
      },
      sendContactMessage: {
        type: GraphQLNonNull(sendMessageResponseType),
        args: {
          personalIdNumber: {
            type: GraphQLNonNull(GraphQLString),
            description: "The ID number of the sender, typically their RUT.",
          },
          emailAddress: {
            type: GraphQLNonNull(GraphQLString),
            description: "The sender's email address.",
          },
          message: {
            type: GraphQLNonNull(GraphQLString),
            description: "The message body to be sent.",
          },
          name: {
            type: GraphQLString,
            description: "The sender's name.",
          },
          phoneNumber: {
            type: GraphQLString,
            description: "The senders' phone number.",
          },
        },
        resolve: resolveSendContactMessage,
      },
    }),
  });

  const cartItemType = new GraphQLObjectType({
    name: "CartItem",
    fields: (): GraphQLFieldReturn => ({
      product: {
        type: GraphQLNonNull(productType),
      },
      quantity: {
        type: GraphQLNonNull(GraphQLInt),
      },
    }),
  });

  const cartType = new GraphQLObjectType({
    name: "Cart",
    fields: (): GraphQLFieldReturn => ({
      cartItems: {
        type: GraphQLList(cartItemType),
      },
    }),
  });

  const mutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: (): GraphQLFieldReturn => ({
      addProductToCart: mutationWithClientMutationId({
        name: "AddProductToCart",
        inputFields: {
          productId: {
            type: GraphQLNonNull(GraphQLID),
          },
          quantity: {
            type: GraphQLNonNull(GraphQLInt),
          },
        },
        outputFields: {
          cart: {
            type: cartType,
            resolve: (payload): Cart => payload.Cart,
          },
        },
        mutateAndGetPayload: async ({ productId, quantity }, ctx) => {
          const cart = ctx.session.cart || { cartItems: [] };
          const product = await getObjectFromGlobalId(productId);

          ctx.session.cart = {
            ...cart,
            cartItems: cart.cartItems.concat({ product, quantity }),
          };

          return { Cart: ctx.session.cart };
        },
      }),
      removeProductFromCart: mutationWithClientMutationId({
        name: "RemoveProductFromCart",
        inputFields: {
          productId: {
            type: GraphQLNonNull(GraphQLID),
          },
        },
        outputFields: {
          cart: {
            type: cartType,
            resolve: (payload): Cart => payload.Cart,
          },
        },
        mutateAndGetPayload: async ({ productId }, ctx) => {
          const cart = ctx.session.cart;
          const productDbId = fromGlobalId(productId).id;

          ctx.session.cart = {
            ...cart,
            cartItems: cart.cartItems.filter(
              (cartItem: CartItem) =>
                cartItem.product.id !== Number(productDbId)
            ),
          };

          return { Cart: ctx.session.cart };
        },
      }),
      updateCartItemQuantity: mutationWithClientMutationId({
        name: "UpdateCartItemQuantity",
        inputFields: {
          productId: {
            type: GraphQLNonNull(GraphQLID),
          },
          quantity: {
            type: GraphQLNonNull(GraphQLInt),
          },
        },
        outputFields: {
          cart: {
            type: cartType,
            resolve: (payload): Cart => payload.Cart,
          },
        },
        mutateAndGetPayload: async ({ productId, quantity }, ctx) => {
          const cart = ctx.session.cart;
          const productDbId = fromGlobalId(productId).id;

          ctx.session.cart = {
            ...cart,
            cartItems: cart.cartItems.map((cartItem: CartItem) => {
              if (cartItem.product.id !== Number(productDbId)) return cartItem;

              return {
                ...cartItem,
                quantity,
              };
            }),
          };

          return { Cart: ctx.session.cart };
        },
      }),
    }),
  });

  return new GraphQLSchema({ query: queryType, mutation: mutationType });
}

export default loadSchema;
