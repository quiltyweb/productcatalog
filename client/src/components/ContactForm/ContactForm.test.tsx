import React from "react";
import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm Component", () => {
  it("renders without crashing", async () => {
    render(<ContactForm />);
  });

  it("should render correct fields", () => {
    render(<ContactForm />);
    screen.getByLabelText("Nombre");
    screen.getByLabelText("Empresa");
    screen.getByLabelText("E-mail");
    screen.getByLabelText("Telefono");
    screen.getByLabelText("Consulta");
  });
});
