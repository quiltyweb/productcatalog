import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("should render", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Footer />
      </Router>
    );

    screen.getByRole("heading", {
      name: "Somos seguridad industrial en Atacama.",
    });
    screen.getByRole("heading", {
      name: "Contáctenos",
    });
    screen.getByRole("heading", {
      name: "Horario de atención",
    });

    screen.getByText("(52) 2 218056");
    screen.getByText(
      "Lunes a Viernes de 9:30 AM a 13:30 PM y 15:30PM a 18:30PM"
    );
  });
});
