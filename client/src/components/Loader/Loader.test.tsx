import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

describe("Loader Component", () => {
  it("should render", () => {
    render(<Loader />);
    screen.getByText("Cargando...");
  });
  it("should be accessible", async () => {
    const { container } = render(<Loader />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
