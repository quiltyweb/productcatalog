import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";
import { setQueryResponse } from "./../../utils/test/setQueryResponse";

jest.mock("relay-runtime");

const history = createMemoryHistory();
const user = userEvent.setup();

describe("ContactForm Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    render(
      <ContactForm
        initialValues={{
          nombre: "",
          empresa: "",
          email: "",
          mensaje: "",
          telefono: "",
          recaptcha: "",
        }}
      />
    );
  });

  it("should render correct fields", () => {
    render(
      <ContactForm
        initialValues={{
          nombre: "",
          empresa: "",
          email: "",
          mensaje: "",
          telefono: "",
          recaptcha: "",
        }}
      />
    );
    screen.getByLabelText("Nombre");
    screen.getByLabelText("Empresa");
    screen.getByLabelText("E-mail");
    screen.getByLabelText("Telefono");
    screen.getByLabelText("Consulta");
  });

  it("should submit the form", async () => {
    setQueryResponse("resolve", {
      sendContactMessage: {
        status: "OK",
        message: "passing",
      },
    });

    render(
      <Router history={history}>
        <ContactForm
          initialValues={{
            nombre: "",
            empresa: "",
            email: "",
            mensaje: "",
            telefono: "",
            recaptcha: "123456",
          }}
        />
      </Router>
    );

    const name = screen.getByLabelText("Nombre");
    const company = screen.getByLabelText("Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Consulta");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.type(name, "mock_name");
    expect(name).toHaveValue("mock_name");

    await user.type(company, "mock_company");
    expect(company).toHaveValue("mock_company");

    await user.type(email, "mock_email");
    expect(email).toHaveValue("mock_email");

    await user.type(phone, "mock_phone");
    expect(phone).toHaveValue("mock_phone");

    await user.type(message, "mock_message");
    expect(message).toHaveValue("mock_message");

    await user.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "Su consulta ha sido enviada con exito a Comercial Gattoni. Responderemos a la brevedad, Gracias."
        )
      ).toBeInTheDocument()
    );
  }, 10000);

  it("should display error message if response has FAILURE status", async () => {
    setQueryResponse("resolve", {
      sendContactMessage: {
        status: "FAILURE",
        message: "error",
      },
    });

    render(
      <Router history={history}>
        <ContactForm
          initialValues={{
            nombre: "",
            empresa: "",
            email: "",
            mensaje: "",
            telefono: "",
            recaptcha: "123456",
          }}
        />
      </Router>
    );

    const name = screen.getByLabelText("Nombre");
    const company = screen.getByLabelText("Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Consulta");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.type(name, "mock_name");
    await user.type(company, "mock_company");
    await user.type(email, "mock_email");
    await user.type(phone, "mock_phone");
    await user.type(message, "mock_message");

    await user.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText("Se ha producido un error, intente nuevamente.")
      ).toBeInTheDocument()
    );
  });

  it.skip("should display error message if submit was not succesful", async () => {
    setQueryResponse("reject", {
      sendContactMessage: {
        status: "FAILURE",
        message: "error",
      },
    });

    render(
      <Router history={history}>
        <ContactForm
          initialValues={{
            nombre: "",
            empresa: "",
            email: "",
            mensaje: "",
            telefono: "",
            recaptcha: "123456",
          }}
        />
      </Router>
    );

    const name = screen.getByLabelText("Nombre");
    const company = screen.getByLabelText("Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Consulta");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.type(name, "mock_name");
    await user.type(company, "mock_company");
    await user.type(email, "mock_email");
    await user.type(phone, "mock_phone");
    await user.type(message, "mock_message");

    await user.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText("Se ha producido un error, intente nuevamente.")
      ).toBeInTheDocument()
    );
  });
});
