import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuoteForm from "./QuoteForm";
import { setQueryResponse } from "./../../utils/test/setQueryResponse";

jest.mock("relay-runtime");

const history = createMemoryHistory();

const mocked_cart = [
  {
    productId: "UHJvZHVjdDox",
    productName: "mascara de soldar fotosensible daumer",
    productImage:
      "https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/stuff.gif",
    quantity: 6,
  },
];

const mocked_initialValues = {
  nombreCompleto: "",
  email: "",
  telefono: "",
  mensaje: "",
  recaptcha: "123456",
};

const user = userEvent.setup();

describe("QuoteForm Component", () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <QuoteForm
          cartItems={mocked_cart}
          initialValues={mocked_initialValues}
        />
      </Router>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    screen.getByRole("button", { name: "Enviar Cotización" });
  });

  it("should render correct fields", () => {
    screen.getByLabelText("Nombre o Empresa");
    screen.getByLabelText("E-mail");
    screen.getByLabelText("Telefono");
    screen.getByText("Click en el botón para verificar antispam:");
    screen.getByLabelText("Observaciones Generales");
    screen.getByRole("button", { name: "Enviar Cotización" });
  });

  it("should submit the form", async () => {
    setQueryResponse("resolve", {
      sendQuoteRequest: {
        status: "OK",
        message: "passing",
      },
    });

    const nombre = screen.getByLabelText("Nombre o Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Observaciones Generales");
    const submitButton = screen.getByRole("button", {
      name: "Enviar Cotización",
    });

    await user.type(nombre, "mock_name");
    expect(nombre).toHaveValue("mock_name");

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
          "Su Cotización ha sido enviada con exito a Comercial Gattoni. Responderemos su pedido a la brevedad, Gracias."
        )
      ).toBeInTheDocument()
    );
  });

  it("should display error message if response has FAILURE status", async () => {
    setQueryResponse("resolve", {
      sendQuoteRequest: {
        status: "FAILURE",
        message: "error",
      },
    });

    const nombre = screen.getByLabelText("Nombre o Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Observaciones Generales");
    const submitButton = screen.getByRole("button", {
      name: "Enviar Cotización",
    });

    await user.type(nombre, "mock_name");
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
      sendQuoteRequest: {
        status: "FAILURE",
        message: "error",
      },
    });

    const nombre = screen.getByLabelText("Nombre o Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Observaciones Generales");
    const submitButton = screen.getByRole("button", {
      name: "Enviar Cotización",
    });

    await user.type(nombre, "mock_name");
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
