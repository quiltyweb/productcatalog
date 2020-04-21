import { GraphQLString, GraphQLNonNull } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

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
}

export default Queries;
