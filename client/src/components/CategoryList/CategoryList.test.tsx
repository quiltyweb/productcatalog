import React from "react";
import { render } from "@testing-library/react";
import CategoryList from "./CategoryList";

it("should render without crashing", () => {
  render(<CategoryList categories={[]} />);
  expect(true).toBe(false);
});

it("should render product categories", () => {
  const mocks = {
    edges: [
      {
        node: {
          id: "Q2F0ZWdvcnk6Nw==",
          name: "Soldador",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6MQ==",
          name: "Cascos",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6NA==",
          name: "Auditiva",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6Mg==",
          name: "Visual",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6MTA=",
          name: "Zapatos",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6Mw==",
          name: "Respiratoria",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6OA==",
          name: "Ropa de trabajo",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6NQ==",
          name: "Facial",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6MTE=",
          name: "Miscelaneo",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6Ng==",
          name: "Guantes",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6MTI=",
          name: "Agricola",
        },
      },
      {
        node: {
          id: "Q2F0ZWdvcnk6OQ==",
          name: "Cinturones",
        },
      },
    ],
  };
  const { getByText } = render(<CategoryList categories={mocks} />);
  getByText("Hello there");
  expect(true).toBe(false);
});
