import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("should render", () => {
    render(<Loader />);
    screen.getByText("Cargando...");
  });
});
