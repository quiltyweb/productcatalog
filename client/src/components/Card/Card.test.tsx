import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  const history = createMemoryHistory();
  it("should render description", () => {
    render(
      <Router history={history}>
        <Card
          productId="123"
          name="card name"
          description="card description"
          linkImage="cardImage.jpg"
        />
      </Router>
    );
    screen.getByText("card description");
  });

  it("should contain a heading level 3", () => {
    render(
      <Router history={history}>
        <Card
          productId="123"
          name="card name"
          description="card description"
          linkImage="cardImage.jpg"
        />
      </Router>
    );
    const Heading = screen.getByRole("heading");
    expect(Heading.tagName).toBe("H3");
  });

  it("should contain a link to view product", () => {
    render(
      <Router history={history}>
        <Card
          productId="123"
          name="card name"
          description="card description"
          linkImage="cardImage.jpg"
        />
      </Router>
    );
    const CTA = screen.getByRole("link");
    expect(CTA).toHaveTextContent("ver producto");
  });

  it("should contain a button to add product to quote", () => {
    render(
      <Router history={history}>
        <Card
          productId="123"
          name="card name"
          description="card description"
          linkImage="cardImage.jpg"
        />
      </Router>
    );

    screen.getByRole("button", { name: "Añadir a cotización" });
  });
});
