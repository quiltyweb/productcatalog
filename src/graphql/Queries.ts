import { GraphQLString, GraphQLNonNull } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import GQLTypes from "./GqlTypes";

import type { Connection } from "graphql-relay";
import type { GraphQLFieldConfig } from "graphql";

import type { SendEmailResponse } from "../email";
import type { TSource, TContext } from "../types";
import type { CartItem } from "../entity/Cart";

class Queries {
  private types: GQLTypes;

  constructor(types: GQLTypes) {
    this.types = types;
  }

  get fetchCategories(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: GraphQLNonNull(this.types.categoryConnectionType),
      args: connectionArgs,
      resolve: async (root, args, ctx): Promise<Connection<Category>> => {
        const categories = await ctx.entityManager.find(Category, {
          relations: ["products"],
        });

        return connectionFromArray(categories, args);
      },
    };
  }

  get searchProducts(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: GraphQLNonNull(this.types.productConnectionType),
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

  get sendContactMessage(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: GraphQLNonNull(this.types.sendMessageResponseType),
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
      resolve: async (root, args, ctx): Promise<SendEmailResponse> => {
        const {
          personalIdNumber,
          emailAddress,
          message,
          name,
          phoneNumber,
        } = args;

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

        const response = await ctx.sendEmail(emailOptions);

        return response;
      },
    };
  }

  get sendQuoteRequest(): GraphQLFieldConfig<TSource, TContext> {
    return {
      type: GraphQLNonNull(this.types.sendMessageResponseType),
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
          type: GraphQLString,
          description: "The message body to be sent.",
        },
        name: {
          type: GraphQLNonNull(GraphQLString),
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
      },
      resolve: async (root, args, ctx): Promise<SendEmailResponse> => {
        const {
          personalIdNumber,
          emailAddress,
          message,
          name,
          companyName,
          phoneNumber,
          city,
        } = args;

        const {
          request,
          session: { cart },
        } = ctx;

        const { ADMIN_EMAIL: emailTo } = process.env;

        const host = (request && request.host) || "productcatalog.com";

        if (!cart || cart.cartItems.length == 0)
          return {
            status: "failure",
            message: "No hay productos en el carrito para cotizar.",
          };

        if (!emailTo)
          throw Error("Missing ADMIN_EMAIL env var to send emails to.");

        const cartItemRows = cart.cartItems
          .map(
            (cartItem: CartItem) => `
              <tr>
                <td>${cartItem.product.name}</td>
                <td>${cartItem.quantity}</td>
                <td>${cartItem.product.salePrice}</td>
              </tr>
            `
          )
          .join("\n");

        const emailMessage = `
            Nombre: ${name}
            RUT: ${personalIdNumber}
            Email: ${emailAddress}
            Número de Teléfono: ${phoneNumber}
            Nombre de Empresa: ${companyName}
            Ciudad: ${city}
            Mensaje: ${message}

            <table>
              <thead>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Listado</th>
              </thead>
              <tbody>
                ${cartItemRows}
              </tbody>
            </table>
          `;

        const emailOptions = {
          to: emailTo,
          from: `cotizacion@${host}`,
          subject: "Pedida de Cotización",
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
