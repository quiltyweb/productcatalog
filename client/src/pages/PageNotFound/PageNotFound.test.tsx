import React from "react";
import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";
import { axe, toHaveNoViolations } from "jest-axe";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

expect.extend(toHaveNoViolations);
const history = createMemoryHistory();

describe("PageNotFound Component", () => {
  it("should render without crashing", () => {
    render(
      <Router history={history}>
        <PageNotFound />
      </Router>
    );
    screen.getByRole("heading", { name: "Página no encontrada (error 404)" });
  });

  it("should be accessible", async () => {
    const { container } = render(
      <Router history={history}>
        <PageNotFound />
      </Router>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
