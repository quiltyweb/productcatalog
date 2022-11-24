import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import {
  connectionArgs,
  connectionFromArray,
  fromGlobalId,
} from "graphql-relay";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import GQLTypes from "./GqlTypes";

import type { Connection } from "graphql-relay";
import type { GraphQLFieldConfig } from "graphql";

import type { SendEmailResponse } from "../email";
import type { TSource, TContext } from "../types";

class Queries {
  private types: GQLTypes;

  constructor(types: GQLTypes) {
    this.types = types;
  }

  get fetchCategories(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: new GraphQLNonNull(this.types.categoryConnectionType),
      args: connectionArgs,
      resolve: async (root, args, ctx): Promise<Connection<Category>> => {
        const categories = await ctx.entityManager.find(Category, {
          relations: ["products"],
        });

        return connectionFromArray(categories, args);
      },
    };
  }

  get fetchCategory(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: new GraphQLNonNull(this.types.categoryType),
      args: {
        categoryId: {
          type: new GraphQLNonNull(GraphQLID),
          description: "ID of the requested category.",
        },
      },
      resolve: async (root, args, ctx): Promise<Category> => {
        const category = await ctx.entityManager.findOne(Category, {
          where: { id: parseInt(fromGlobalId(args.categoryId).id) },
          relations: ["products"],
        });

        return category;
      },
    };
  }

  get searchProducts(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: new GraphQLNonNull(this.types.productConnectionType),
      args: {
        searchTerm: {
          type: new GraphQLNonNull(GraphQLString),
          description: `
              Search term to use to match products in the DB.
              Matches on name only, converting the search and the names
              to lowercase.
            `,
        },
        ...connectionArgs,
      },
      resolve: async (root, args, ctx): Promise<Connection<Product>> => {
        const { searchTerm } = args;
        const products = await ctx.entityManager
          .createQueryBuilder(Product, "products")
          // Need to put the whole LIKE string in the variable due to how typeorm
          // handles interpolation
          .where("LOWER(products.name) LIKE :searchTerm", {
            searchTerm: `%${searchTerm.toLowerCase()}%`,
          })
          .getMany();

        return connectionFromArray(products, args);
      },
    };
  }

  get fetchProduct(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: new GraphQLNonNull(this.types.productType),
      args: {
        productId: {
          type: new GraphQLNonNull(GraphQLID),
          description: "ID of the requested product.",
        },
      },
      resolve: async (root, args, ctx): Promise<Product> => {
        const product = await ctx.entityManager.findOne(Product, {
          where: { id: parseInt(fromGlobalId(args.productId).id) },
        });

        return product;
      },
    };
  }

  get sendContactMessage(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: new GraphQLNonNull(this.types.sendMessageResponseType),
      args: {
        personalIdNumber: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The ID number of the sender, typically their RUT.",
        },
        emailAddress: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The sender's email address.",
        },
        message: {
          type: new GraphQLNonNull(GraphQLString),
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
      resolve: async (root, args, ctx): Promise<SendEmailResponse> => {
        const { personalIdNumber, emailAddress, message, name, phoneNumber } =
          args;

        const { request } = ctx;
        const { ADMIN_EMAIL: emailTo, HQ_ADMIN_EMAIL: hqEmailTo } = process.env;
        const requestHost = request && request.host;
        const isInvalidEmailHost =
          !requestHost || requestHost.includes("localhost");
        const host = isInvalidEmailHost ? "productcatalog.com" : requestHost;

        if (!emailTo && !hqEmailTo)
          throw Error(
            "Missing ADMIN_EMAIL and HQ_ADMIN_EMAIL env var to send emails to."
          );

        const emailMessage = `
            Nombre: ${name},
            RUT: ${personalIdNumber},
            Email: ${emailAddress},
            Número de Teléfono: ${phoneNumber},
            Mensaje: ${message}
          `;

        const emailOptions = {
          to: `${emailTo}, ${hqEmailTo}`,
          from: `contacto@${host}`,
          subject: "GATTONI.CL: MENSAJE DE CONTACTO",
          text: emailMessage,
        };

        const response = await ctx.sendEmail(emailOptions);

        return response;
      },
    };
  }

  get sendQuoteRequest(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: new GraphQLNonNull(this.types.sendMessageResponseType),
      args: {
        input: {
          type: new GraphQLNonNull(this.types.quoteRequestInputType),
        },
      },
      resolve: async (root, args, ctx): Promise<SendEmailResponse> => {
        const {
          personalDetails: {
            personalIdNumber,
            emailAddress,
            message,
            name,
            companyName,
            phoneNumber,
            city,
          },
          productsToQuote,
        } = args.input;

        const { request, entityManager } = ctx;
        const { ADMIN_EMAIL: emailTo, HQ_ADMIN_EMAIL: hqEmailTo } = process.env;
        const requestHost = request && request.host;
        const isInvalidEmailHost =
          !requestHost ||
          requestHost.includes("localhost") ||
          requestHost.includes("server");
        const host = isInvalidEmailHost ? "productcatalog.com" : requestHost;

        if (!emailTo && !hqEmailTo)
          throw Error(
            "Missing ADMIN_EMAIL and HQ_ADMIN_EMAIL env var to send emails to."
          );

        const products = await Promise.all(
          productsToQuote.map(async ({ productId, quantity }) => {
            const { name, salePrice } = await entityManager.findOneOrFail(
              Product,
              {
                select: ["name", "salePrice"],
                where: { id: parseInt(fromGlobalId(productId).id) },
              }
            );

            return { productId, name, salePrice, quantity };
          })
        );

        const productRows = products
          .map(
            ({ productId, name, quantity, salePrice }) => `
              <tr>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${salePrice}</td>
                <td><a href="${`https://${requestHost}/producto/${productId}`}">Ver producto</a></td>
              </tr>
            `
          )
          .join("\n");

        const emailMessage = `
          <table>
            <tbody>
              <tr>
              <td>
              Nombre: ${name}
              </td>
              </tr>
              <tr>
              <td>
              RUT: ${personalIdNumber}
              </td>
              </tr>
              <tr>
              <td>
              Email: ${emailAddress}
              </td>
              </tr>
              <tr>
              <td>
              Número de Teléfono: ${phoneNumber}
              </td>
              </tr>
              <tr>
              <td>
              Nombre de Empresa: ${companyName}
              </td>
              </tr>
              <tr>
              <td>
              Ciudad: ${city}
              </td>
              </tr>
              <tr>
              <td>
              Mensaje: ${message}
              </td>
              </tr>
            </tbody>
          </table>
            <table>
              <thead>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Listado</th>
              </thead>
              <tbody>
                ${productRows}
              </tbody>
            </table>
          `;

        const emailOptions = {
          to: `${emailTo}, ${hqEmailTo}`,
          from: `cotizacion@${host}`,
          subject: "GATTONI.CL: PEDIDO DE COTIZACIÓN",
          text: emailMessage,
          html: emailMessage,
        };

        const response = await ctx.sendEmail(emailOptions);

        return response;
      },
    };
  }
}

export default Queries;
