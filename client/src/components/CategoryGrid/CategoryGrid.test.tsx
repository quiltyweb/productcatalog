import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import CategoryGrid from "./CategoryGrid";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

let environment: RelayMockEnvironment;
const history = createMemoryHistory();

beforeEach(() => {
  environment = createMockEnvironment();
  const TestRenderer = () => (
    <Router history={history}>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query CategoryGridTestQuery @relay_test_operation {
            categoryGridItems: fetchCategories {
              ...CategoryGrid_categoryGridItems
            }
          }
        `}
        variables={{}}
        render={({ error, props }: { error: any; props: any }) => {
          if (props) {
            return <CategoryGrid categoryGridItems={props.categoryGridItems} />;
          } else if (error) {
            return error.message;
          }
        }}
      />
    </Router>
  );

  render(<TestRenderer />);
});

afterEach(() => {
  environment.mock.clearCache();
});

describe("CategoryGrid Fragment Container", () => {
  test("should render empty state when there are no categories", () => {
    environment.mock.resolveMostRecentOperation((operation) => {
      return MockPayloadGenerator.generate(operation, {
        CategoryConnection() {
          return {
            edges: [],
          };
        },
      });
    });

    screen.getByText("No hay categorias");
  });

  test("should render categories", () => {
    environment.mock.resolveMostRecentOperation((operation) => {
      return MockPayloadGenerator.generate(operation, {
        CategoryConnection() {
          return {
            edges: [
              {
                node: { id: "1", name: "Soldador" },
              },
              {
                node: { id: "2", name: "Zapatos" },
              },
            ],
          };
        },
      });
    });

    screen.getByRole("heading", { name: "categoría Soldador" });
    screen.getByRole("heading", { name: "categoría Zapatos" });
  });
});
