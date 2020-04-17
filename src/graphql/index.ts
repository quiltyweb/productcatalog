import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";
import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from "graphql-relay";
import { Connection as DbConnection } from "typeorm";
import sgMail from "@sendgrid/mail";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";

import type { GraphQLFieldConfigMap } from "graphql";
import type { Connection } from "graphql-relay";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLFieldReturn = GraphQLFieldConfigMap<any, any>;
type SendMessageResponse = {
  status: string;
  message: string;
};

async function loadSchema(connection: DbConnection): Promise<GraphQLSchema> {
  const entityManager = connection.manager;

  const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
      const { type, id } = fromGlobalId(globalId);

      if (type === "Category") return entityManager.findOne(Category, id);
      if (type === "Product") return entityManager.findOne(Product, id);
    },
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
    args
  ): Promise<SendMessageResponse> {
    const { personalIdNumber, emailAddress, message, name, phoneNumber } = args;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const emailTo = process.env.ADMIN_EMAIL || "";
    const hostname = process.env.HOSTNAME || "";

    const emailMessage = `
      Nombre: ${name}
      RUT: ${personalIdNumber}
      Email: ${emailAddress}
      Número de Teléfono: ${phoneNumber}
      Mensaje: ${message}
    `;

    const msg = {
      to: emailTo,
      from: `contacto@${hostname}`,
      subject: "Mensaje de Contacto",
      text: emailMessage,
      mailSettings: {
        sandboxMode: {
          enable: process.env.NODE_ENV !== "production",
        },
      },
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      const errorMessage = error.response && error.response.body;

      return { status: "failure", message: errorMessage };
    }

    return { status: "success", message: "Email was sent." };
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

  return new GraphQLSchema({ query: queryType });
}

export default loadSchema;