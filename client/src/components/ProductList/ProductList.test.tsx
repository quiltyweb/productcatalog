import React from "react";
import { OperationDescriptor, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  MockEnvironment,
} from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider as AlertProvider } from "react-alert";

const AlertTemplate = () => <div>template</div>;

let environment: MockEnvironment;
const history = createMemoryHistory();

beforeEach(() => {
  environment = createMockEnvironment();
  const TestRenderer = () => (
    <AlertProvider template={AlertTemplate}>
      <Router history={history}>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query ProductListTestQuery($categoryId: ID!) @relay_test_operation {
              fetchCategory: fetchCategory(categoryId: $categoryId) {
                id
                name
                products {
                  ...ProductList_products
                }
              }
            }
          `}
          variables={{ categoryId: "id123" }}
          render={({ error, props }: { error: any; props: any }) => {
            if (props) {
              return <ProductList products={props.fetchCategory.products} />;
            } else if (error) {
              return error.message;
            }
          }}
        />
      </Router>
    </AlertProvider>
  );

  render(<TestRenderer />);
});

afterEach(() => {
  environment.mock.clearCache();
});

describe("ProductList Fragment Container", () => {
  test("should render empty state when there are no products", () => {
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) => {
        return MockPayloadGenerator.generate(operation, {
          ProductConnection() {
            return {
              edges: [],
            };
          },
        });
      }
    );

    screen.getByText(
      "No se encontraron productos. Intente con otra palabra o categoría."
    );
  });

  test("should render products", () => {
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) => {
        return MockPayloadGenerator.generate(operation, {
          ProductConnection() {
            return {
              edges: [
                {
                  node: {
                    id: "1",
                    name: "Soldador",
                    imagePath: "imagePath1",
                    attachmentPath: "attachmentPath1",
                  },
                },
                {
                  node: {
                    id: "2",
                    name: "Zapatos",
                    imagePath: "imagePath2",
                    attachmentPath: "attachmentPath2",
                  },
                },
              ],
            };
          },
        });
      }
    );
    screen.getByRole("heading", { name: "Soldador" });
    screen.getByRole("heading", { name: "Zapatos" });
  });
});
