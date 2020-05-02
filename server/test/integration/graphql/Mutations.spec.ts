import { createConnection, Connection } from "typeorm";
import { graphql } from "graphql";
import { toGlobalId } from "graphql-relay";
import faker from "faker";

import { schema } from "../../../src/graphql";
import { Category } from "../../../src/entity/Category";
import { Product } from "../../../src/entity/Product";
import { ProductFactory, CategoryFactory } from "../../fixtures/factories";

// Declaring global variables to be able to make a DB connection
// once instead of inside every 'it' function, because 'describe' functions
// can't return promises.
let connection: Connection;
let baseContext;

beforeAll(async () => {
  connection = await createConnection("test");
  baseContext = { entityManager: connection.manager };

  const recordCount = 2;

  // For now, we don't have mutations that modify DB records, and manager.save
  // doesn't return attributes set by the DB (e.g. id). So, it's easier
  // to create a few records here and fetch them with DB queries as needed.
  const categories = CategoryFactory.buildMany(recordCount);
  await connection.manager.save(Category, categories);
  const categoryRecords = await connection.manager.find(Category);

  const products = categoryRecords.flatMap((category: Category) =>
    ProductFactory.buildMany(recordCount, { category })
  );
  await connection.manager.save(Product, products);
});

afterAll(async () => await connection.close());

describe("GraphQL schema", () => {
  describe("addProductToCart", () => {
    const query = `
      mutation($productId: ID!, $quantity: Int!) {
        addProductToCart(input: {
          productId: $productId,
          quantity: $quantity
        }) {
          cart {
            cartItems {
              edges {
                node {
                  product { id }
                  quantity
                }
              }
            }
          }
        }
      }
    `;

    const quantity = faker.random.number({ min: 1, max: 10 });

    it("returns the cart with the new item", async () => {
      expect.assertions(1);

      const product = await connection.manager.findOne(Product);
      const gqlId = toGlobalId("Product", String(product.id));

      const session = {};
      const context = { ...baseContext, session };
      const variables = {
        quantity,
        productId: gqlId,
      };

      const results = await graphql(schema, query, null, context, variables);
      const cartItems = results.data.addProductToCart.cart.cartItems.edges.map(
        (ciEdge) => ciEdge.node
      );

      expect(cartItems).toEqual([
        {
          product: { id: gqlId },
          quantity: quantity,
        },
      ]);
    });

    it("includes existing items in the cart returned", async () => {
      expect.assertions(1);

      const firstProduct = await connection.manager.findOne(Product);
      const firstGqlId = toGlobalId("Product", String(firstProduct.id));

      const secondProduct = await connection.manager
        .createQueryBuilder(Product, "products")
        .where("products.id != :id", { id: firstProduct.id })
        .getOne();
      const secondGqlId = toGlobalId("Product", String(secondProduct.id));

      const session = {
        cart: {
          cartItems: [
            {
              id: 1,
              product: firstProduct,
              quantity: 3,
            },
          ],
        },
      };
      const context = { ...baseContext, session };
      const variables = {
        quantity,
        productId: secondGqlId,
      };

      const results = await graphql(schema, query, null, context, variables);
      const cartItems = results.data.addProductToCart.cart.cartItems.edges.map(
        (ciEdge) => ciEdge.node
      );

      expect(cartItems).toEqual([
        {
          product: { id: firstGqlId },
          quantity: 3,
        },
        {
          product: { id: secondGqlId },
          quantity,
        },
      ]);
    });
  });

  describe("removeProductFromCart", () => {
    const query = `
      mutation($cartItemId: ID!) {
        removeProductFromCart(input: { cartItemId: $cartItemId }) {
          cart {
            cartItems {
              edges {
                node {
                  product { id }
                }
              }
            }
          }
        }
      }
    `;

    it("removes the given product from the cart", async () => {
      const firstProduct = await connection.manager.findOne(Product);
      const firstQuantity = faker.random.number({ min: 1, max: 10 });

      const secondProduct = await connection.manager
        .createQueryBuilder(Product, "products")
        .where("products.id != :id", { id: firstProduct.id })
        .getOne();
      const secondProductId = toGlobalId("Product", String(secondProduct.id));
      const secondQuantity = faker.random.number({ min: 1, max: 10 });

      const firstCartItemId = toGlobalId("CartItem", "1");

      const session = {
        cart: {
          cartItems: [
            {
              product: firstProduct,
              quantity: firstQuantity,
            },
            {
              product: secondProduct,
              quantity: secondQuantity,
            },
          ],
        },
      };
      const context = { ...baseContext, session };
      const variables = {
        cartItemId: firstCartItemId,
      };

      const results = await graphql(schema, query, null, context, variables);
      const cartItems = results.data.removeProductFromCart.cart.cartItems.edges.map(
        (ciEdge) => ciEdge.node
      );

      expect(cartItems).toEqual([
        {
          product: { id: secondProductId },
        },
      ]);
    });
  });

  describe("updateCartItemQuantity", () => {
    const query = `
      mutation($cartItemId: ID!, $quantity: Int!) {
        updateCartItemQuantity(input: {
          cartItemId: $cartItemId,
          quantity: $quantity
        }) {
          cart {
            cartItems {
              edges {
                node {
                  product { id }
                  quantity
                }
              }
            }
          }
        }
      }
    `;

    it("updates the quanity for the given product's cart item", async () => {
      const firstProduct = await connection.manager.findOne(Product);
      const firstGqlId = toGlobalId("Product", String(firstProduct.id));
      const oldFirstQuantity = 3;
      const newFirstQuantity = oldFirstQuantity + 2;

      const secondProduct = await connection.manager
        .createQueryBuilder(Product, "products")
        .where("products.id != :id", { id: firstProduct.id })
        .getOne();
      const secondGqlId = toGlobalId("Product", String(secondProduct.id));
      const secondQuantity = faker.random.number({ min: 1, max: 10 });

      const firstCartItemId = toGlobalId("CartItem", "1");

      const session = {
        cart: {
          cartItems: [
            {
              product: firstProduct,
              quantity: oldFirstQuantity,
            },
            {
              product: secondProduct,
              quantity: secondQuantity,
            },
          ],
        },
      };
      const context = { ...baseContext, session };
      const variables = {
        cartItemId: firstCartItemId,
        quantity: newFirstQuantity,
      };

      const results = await graphql(schema, query, null, context, variables);
      const cartItems = results.data.updateCartItemQuantity.cart.cartItems.edges.map(
        (ciEdge) => ciEdge.node
      );

      expect(cartItems).toEqual([
        {
          product: { id: firstGqlId },
          quantity: newFirstQuantity,
        },
        {
          product: { id: secondGqlId },
          quantity: secondQuantity,
        },
      ]);
    });
  });
});
