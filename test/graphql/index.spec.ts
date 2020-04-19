import assert from "assert";

import { createConnection, Connection } from "typeorm";
import { graphql, GraphQLSchema } from "graphql";
import { toGlobalId } from "graphql-relay";
import faker from "faker";

import loadSchema from "../../src/graphql";
import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Product";
import Email from "../../src/email";

type ProductData = {
  category: Category;
  name: string;
  description: string;
  imagePath: string;
  attachmentPath: string;
  purchasePrice: number;
  salePrice: number;
  supplierName: string;
};

// Declaring global variables to be able to make a DB connection
// and load the GQL schema once instead of inside every 'it' function,
// because 'describe' functions can't return promises.
let connection: Connection;
let schema: GraphQLSchema;

beforeAll(async () => {
  connection = await createConnection("test");

  // Make sure the DB is empty
  const existingCategories = await connection.manager.find(Category);
  const categoryCount = existingCategories.length;
  assert(categoryCount === 0);

  const rangeCount = 5;
  const range = Array(rangeCount).fill(null);

  const categories = range.map(() => ({
    name: faker.commerce.productAdjective(),
  }));
  await connection.manager.insert(Category, categories);
  const categoryRecords = await connection.manager.find(Category);

  const products = categoryRecords.flatMap((category: Category) =>
    range.map(() => {
      const product = new Product();

      const purchasePrice = faker.random.number({ min: 10000, max: 100000 });

      product.category = category;
      product.name = faker.commerce.productName();
      product.description = faker.lorem.paragraph();
      product.imagePath = faker.internet.url();
      product.attachmentPath = faker.internet.url();
      product.purchasePrice = purchasePrice;
      product.salePrice = faker.random.number({
        min: 10000,
        max: purchasePrice,
      });
      product.supplierName = faker.company.companyName();

      return product;
    })
  );

  await connection.manager.save(products);

  schema = await loadSchema(connection);
});

afterAll(async (done) => {
  await connection.dropDatabase();
  connection.close();
  done();
});

describe("GraphQL schema", () => {
  describe("fetchCategories", () => {
    const query = `
      query {
        fetchCategories {
          edges {
            node {
              name
              products {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    it("returns category fields", async () => {
      expect.assertions(2);

      const results = await graphql(schema, query);
      const categories = results.data.fetchCategories.edges.map(
        (catEdge) => catEdge.node
      );

      expect(categories).toContainEqual(
        expect.objectContaining({ name: expect.any(String) })
      );
      expect(categories).not.toContainEqual(undefined);
    });

    it("returns associated products", async () => {
      expect.assertions(1);

      const results = await graphql(schema, query);
      const categories = results.data.fetchCategories.edges.map(
        (catEdge) => catEdge.node
      );

      const products = categories
        .map((cat) => cat.products.edges.map((prodEdge) => prodEdge.node))
        .flat(1);

      expect(products).toContainEqual(
        expect.objectContaining({ name: expect.any(String) })
      );
    });
  });

  describe("searchProducts", () => {
    const query = `
      query($searchTerm: String!) {
        searchProducts(searchTerm: $searchTerm) {
          edges {
            node { name }
          }
        }
      }
    `;

    it("returns any matching products", async () => {
      expect.assertions(1);

      // Need to create the product in the `it` function, because `describe`
      // callbacks can't be async
      const purchasePrice = faker.random.number({ min: 10000, max: 100000 });
      const category = await connection.manager.findOne(Category, 1);

      await connection.manager.insert(Product, {
        category: category,
        name: "Guantes de Seguridad",
        description: faker.lorem.paragraph(),
        imagePath: faker.internet.url(),
        attachmentPath: faker.internet.url(),
        purchasePrice: purchasePrice,
        salePrice: faker.random.number({ min: 10000, max: purchasePrice }),
        supplierName: faker.company.companyName(),
      });

      const results = await graphql(schema, query, null, null, {
        searchTerm: "guantes",
      });
      const products = results.data.searchProducts.edges.map(
        (prodEdge) => prodEdge.node
      );

      expect(products).toContainEqual(
        expect.objectContaining({ name: expect.stringMatching(/[gG]uantes/) })
      );
    });

    describe("when there are no matching products", () => {
      it("returns an empty array", async () => {
        expect.assertions(1);

        const results = await graphql(schema, query, null, null, {
          searchTerm: "something that definitely doesn't exist",
        });
        const products = results.data.searchProducts.edges.map(
          (prodEdge) => prodEdge.node
        );

        expect(products.length).toEqual(0);
      });
    });
  });

  describe("sendContactMessage", () => {
    const query = `
      query(
        $personalIdNumber: String!,
        $emailAddress: String!,
        $message: String!,
        $name: String,
        $phoneNumber: String
      ) {
        sendContactMessage(
          personalIdNumber: $personalIdNumber,
          emailAddress: $emailAddress,
          message: $message,
          name: $name,
          phoneNumber: $phoneNumber
        ) {
          status
          message
        }
      }
    `;

    const mockResponse = { status: "success", message: "hooray" };
    const mockSend = jest.fn(async () => mockResponse);
    Email.send = mockSend;

    const context = { sendEmail: Email.send };
    const variables = {
      personalIdNumber: "13421234",
      emailAddress: "test@test.com",
      message: "I want more info",
      name: "Roberto",
      phoneNumber: "12341234",
    };

    it("sends an email", async () => {
      expect.assertions(1);

      await graphql(schema, query, null, context, variables);
      expect(mockSend.mock.calls.length).toBe(1);
    });

    it("returns response status info", async () => {
      expect.assertions(1);

      const results = await graphql(schema, query, null, context, variables);

      const messageResponse = results.data.sendContactMessage;

      expect(messageResponse).toEqual({
        ...mockResponse,
        status: mockResponse.status.toUpperCase(),
      });
    });
  });

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

      const product = await connection.manager.findOne(Product, 1);
      const gqlId = toGlobalId("Product", String(product.id));

      const context = { session: {} };
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

      const firstProduct = await connection.manager.findOne(Product, 1);
      const firstGqlId = toGlobalId("Product", String(firstProduct.id));
      const secondProduct = await connection.manager.findOne(Product, 2);
      const secondGqlId = toGlobalId("Product", String(secondProduct.id));

      const context = {
        session: {
          cart: {
            cartItems: [
              {
                product: firstProduct,
                quantity: 3,
              },
            ],
          },
        },
      };
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
      const firstProduct = await connection.manager.findOne(Product, 1);
      const firstQuantity = faker.random.number({ min: 1, max: 10 });
      const secondProduct = await connection.manager.findOne(Product, 2);
      const secondQuantity = faker.random.number({ min: 1, max: 10 });
      const secondProductId = toGlobalId("Product", String(secondProduct.id));
      const firstCartItemId = toGlobalId("CartItem", "1");

      const context = {
        session: {
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
        },
      };
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
      const firstProduct = await connection.manager.findOne(Product, 1);
      const firstGqlId = toGlobalId("Product", String(firstProduct.id));
      const oldFirstQuantity = 3;
      const newFirstQuantity = oldFirstQuantity + 2;
      const secondProduct = await connection.manager.findOne(Product, 2);
      const secondGqlId = toGlobalId("Product", String(secondProduct.id));
      const secondQuantity = faker.random.number({ min: 1, max: 10 });
      const firstCartItemId = toGlobalId("CartItem", "1");

      const context = {
        session: {
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
        },
      };

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
