import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import CategoryList from "./CategoryList";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const environment = createMockEnvironment();
const history = createMemoryHistory();

beforeEach(() => {
  const TestRenderer = () => (
    <Router history={history}>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query CategoryListTestQuery @relay_test_operation {
            categories: fetchCategories {
              ...CategoryList_categories
            }
          }
        `}
        variables={{}}
        render={({ error, props }: { error: any; props: any }) => {
          if (props) {
            return <CategoryList categories={props.categories} />;
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

describe("CategoryList Fragment Container", () => {
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

    screen.getByRole("link", { name: "Soldador" });
    screen.getByRole("link", { name: "Zapatos" });
  });
});
