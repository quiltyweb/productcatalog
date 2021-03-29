import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Child = () => {
  throw new Error();
};

describe("ErrorBoundary Component", () => {
  it("should render an error", () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    screen.getByText(
      "Se ha producido un Error, Refresque la página e intente nuevamente. Atte. Gattoni.cl"
    );
  });
});
