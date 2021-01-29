import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContactForm from "./ContactForm";
import userEvent from "@testing-library/user-event";

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

  // it("should submit the form", async () => {
  //   render(<ContactForm />);
  //   // const name = screen.getByLabelText("Nombre");
  //   // const company = screen.getByLabelText("Empresa");
  //   // const email = screen.getByLabelText("E-mail");
  //   // const phone = screen.getByLabelText("Telefono");
  //   // const message = screen.getByLabelText("Consulta");

  //   // userEvent.type(name, "mock_name");
  //   // expect(name).toHaveValue("mock_name");

  //   // fireEvent.change(company, {
  //   //   target: {
  //   //     value: "mock_company",
  //   //   },
  //   // });
  //   // fireEvent.change(email, {
  //   //   target: {
  //   //     value: "mock_email",
  //   //   },
  //   // });
  //   // fireEvent.change(phone, {
  //   //   target: {
  //   //     value: "mock_phone",
  //   //   },
  //   // });
  //   // fireEvent.change(message, {
  //   //   target: {
  //   //     value: "mock_message",
  //   //   },
  //   // });
  // });
});
