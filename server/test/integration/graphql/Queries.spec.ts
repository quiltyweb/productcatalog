import { createConnection, Connection } from "typeorm";
import { graphql } from "graphql";
import { toGlobalId } from "graphql-relay";
import faker from "faker";

import { schema } from "../../../src/graphql";
import { Category } from "../../../src/entity/Category";
import { Product } from "../../../src/entity/Product";
import Email from "../../../src/email";
import { ProductFactory, CategoryFactory } from "../../fixtures/factories";

// Declaring global variables to be able to make a DB connection
// once instead of inside every 'it' function, because 'describe' functions
// can't return promises.
let connection: Connection;
let baseContext;

beforeAll(async () => {
  connection = await createConnection("test");
  baseContext = { entityManager: connection.manager };

  const recordCount = 5;

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

      const context = { ...baseContext };

      const results = await graphql(schema, query, null, context);
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

      const context = { ...baseContext };

      const results = await graphql(schema, query, null, context);
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

  describe("fetchCategory", () => {
    const query = `
      query($categoryId: ID!) {
        fetchCategory(categoryId: $categoryId) {
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
    `;

    it("returns category fields", async () => {
      expect.assertions(1);

      const context = { ...baseContext };

      const category = await connection.manager.findOne(Category);
      const gqlId = toGlobalId("Category", String(category.id));
      const variables = { categoryId: gqlId };

      const results = await graphql(schema, query, null, context, variables);
      console.log(JSON.stringify(results));
      const queriedCategory = results.data.fetchCategory;

      expect(category.name).toEqual(queriedCategory.name);
    });

    it("returns associated products", async () => {
      expect.assertions(1);

      const context = { ...baseContext };

      const category = await connection.manager.findOne(Category);
      const gqlId = toGlobalId("Category", String(category.id));
      const variables = { categoryId: gqlId };

      const results = await graphql(schema, query, null, context, variables);
      const queriedCategory = results.data.fetchCategory;

      const products = queriedCategory.products.edges.map(
        (prodEdge) => prodEdge.node
      );

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

      const context = { ...baseContext };

      const category = await connection.manager.findOne(Category);

      // Need to create the product in the `it` function, because `describe`
      // callbacks can't be async
      await connection.manager.save(
        Product,
        ProductFactory.build({
          category: category,
          name: "Guantes de Seguridad",
        })
      );

      const results = await graphql(schema, query, null, context, {
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

        const context = { ...baseContext };

        const results = await graphql(schema, query, null, context, {
          searchTerm: "something that definitely doesn't exist",
        });
        const products = results.data.searchProducts.edges.map(
          (prodEdge) => prodEdge.node
        );

        expect(products.length).toEqual(0);
      });
    });
  });

  describe("fetchProduct", () => {
    const query = `
      query($productId: ID!) {
        fetchProduct(productId: $productId) {
          name
        }
      }
    `;

    it("returns product fields", async () => {
      expect.assertions(1);

      const context = { ...baseContext };

      const product = await connection.manager.findOne(Product);
      const gqlId = toGlobalId("Product", String(product.id));
      const variables = { productId: gqlId };

      const results = await graphql(schema, query, null, context, variables);
      console.log(JSON.stringify(results));
      const queriedProduct = results.data.fetchProduct;

      expect(product.name).toEqual(queriedProduct.name);
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

    const variables = {
      personalIdNumber: "13421234",
      emailAddress: "test@test.com",
      message: "I want more info",
      name: "Roberto",
      phoneNumber: "12341234",
    };

    it("sends an email", async () => {
      expect.assertions(1);

      const context = { ...baseContext, sendEmail: Email.send };

      await graphql(schema, query, null, context, variables);
      expect(mockSend.mock.calls.length).toBe(1);
    });

    it("returns response status info", async () => {
      expect.assertions(1);

      const context = { ...baseContext, sendEmail: Email.send };
      const results = await graphql(schema, query, null, context, variables);
      const messageResponse = results.data.sendContactMessage;

      expect(messageResponse).toEqual({
        ...mockResponse,
        status: mockResponse.status.toUpperCase(),
      });
    });
  });

  describe("sendQuoteRequest", () => {
    const query = `
      query(
        $personalIdNumber: String!,
        $emailAddress: String!,
        $name: String!,
        $companyName: String,
        $phoneNumber: String,
        $city: String,
        $message: String,
        $firstProductId: ID!,
        $secondProductId: ID!,
        $firstQuantity: Int!,
        $secondQuantity: Int!
      ) {
        sendQuoteRequest(
          input: {
            personalDetails: {
              personalIdNumber: $personalIdNumber,
              emailAddress: $emailAddress,
              name: $name,
              companyName: $companyName,
              phoneNumber: $phoneNumber,
              city: $city,
              message: $message
            },
            productsToQuote: [
              { productId: $firstProductId, quantity: $firstQuantity },
              { productId: $secondProductId, quantity: $secondQuantity },
            ]
          }
        ) {
          status
          message
        }
      }
    `;

    const mockResponse = { status: "success", message: "hooray" };
    const mockSend = jest.fn(async () => mockResponse);

    const variables = {
      personalIdNumber: "13421234",
      emailAddress: "test@test.com",
      message: "I want more info",
      name: "Roberto",
      companyName: "Roberto Ltda.",
      phoneNumber: "12341234",
      city: "Santiago",
    };

    it("sends an email", async () => {
      expect.assertions(1);

      const firstProduct = await connection.manager.findOne(Product);
      const firstQuantity = faker.random.number({ min: 1, max: 10 });

      const secondProduct = await connection.manager
        .createQueryBuilder(Product, "products")
        .where("products.id != :id", { id: firstProduct.id })
        .getOne();
      const secondQuantity = faker.random.number({ min: 1, max: 10 });

      const productVariables = {
        ...variables,
        firstProductId: toGlobalId("Product", String(firstProduct.id)),
        secondProductId: toGlobalId("Product", String(secondProduct.id)),
        firstQuantity,
        secondQuantity,
      };
      const context = { ...baseContext, sendEmail: mockSend };

      await graphql(schema, query, null, context, productVariables);

      expect(mockSend.mock.calls.length).toBe(1);
    });

    it("returns response status info", async () => {
      expect.assertions(1);

      const firstProduct = await connection.manager.findOne(Product);
      const firstQuantity = faker.random.number({ min: 1, max: 10 });

      const secondProduct = await connection.manager
        .createQueryBuilder(Product, "products")
        .where("products.id != :id", { id: firstProduct.id })
        .getOne();
      const secondQuantity = faker.random.number({ min: 1, max: 10 });

      const productVariables = {
        ...variables,
        firstProductId: toGlobalId("Product", String(firstProduct.id)),
        secondProductId: toGlobalId("Product", String(secondProduct.id)),
        firstQuantity,
        secondQuantity,
      };
      const context = { ...baseContext, sendEmail: mockSend };

      const results = await graphql(
        schema,
        query,
        null,
        context,
        productVariables
      );
      const messageResponse = results.data.sendQuoteRequest;

      expect(messageResponse).toEqual({
        ...mockResponse,
        status: mockResponse.status.toUpperCase(),
      });
    });
  });
});
