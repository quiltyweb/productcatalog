import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuoteForm from "./QuoteForm";
import nock from "nock";

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
    nock.cleanAll();
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
    nock("http://localhost:3000/")
      .post(`/graphql`)
      .reply(200, {
        data: {
          sendQuoteRequest: {
            status: "OK",
            message: "passing",
          },
        },
      });

    const nombre = screen.getByLabelText("Nombre o Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Observaciones Generales");
    const submitButton = screen.getByRole("button", {
      name: "Enviar Cotización",
    });

    userEvent.type(nombre, "mock_name");
    expect(nombre).toHaveValue("mock_name");

    userEvent.type(email, "mock_email");
    expect(email).toHaveValue("mock_email");

    userEvent.type(phone, "mock_phone");
    expect(phone).toHaveValue("mock_phone");

    userEvent.type(message, "mock_message");
    expect(message).toHaveValue("mock_message");

    act(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() =>
      expect(
        screen.getByText(
          "Su Cotización ha sido enviada con exito a Comercial Gattoni. Responderemos su pedido a la brevedad, Gracias."
        )
      ).toBeInTheDocument()
    );
  });

  it("should display error message if response has FAILURE status", async () => {
    nock("http://localhost:3000/")
      .post(`/graphql`)
      .reply(200, {
        data: {
          sendQuoteRequest: {
            status: "FAILURE",
            message: "error",
          },
        },
      });

    const nombre = screen.getByLabelText("Nombre o Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Observaciones Generales");
    const submitButton = screen.getByRole("button", {
      name: "Enviar Cotización",
    });

    userEvent.type(nombre, "mock_name");
    userEvent.type(email, "mock_email");
    userEvent.type(phone, "mock_phone");
    userEvent.type(message, "mock_message");

    act(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() =>
      expect(
        screen.getByText("Se ha producido un error, intente nuevamente.")
      ).toBeInTheDocument()
    );
  });

  it("should display error message if submit was not succesful", async () => {
    nock("http://localhost:3000/")
      .post(`/graphql`)
      .replyWithError({
        data: {
          sendQuoteRequest: {
            status: "FAILURE",
            message: "error",
          },
        },
      });

    const nombre = screen.getByLabelText("Nombre o Empresa");
    const email = screen.getByLabelText("E-mail");
    const phone = screen.getByLabelText("Telefono");
    const message = screen.getByLabelText("Observaciones Generales");
    const submitButton = screen.getByRole("button", {
      name: "Enviar Cotización",
    });

    userEvent.type(nombre, "mock_name");
    userEvent.type(email, "mock_email");
    userEvent.type(phone, "mock_phone");
    userEvent.type(message, "mock_message");

    act(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() =>
      expect(
        screen.getByText("Se ha producido un error, intente nuevamente.")
      ).toBeInTheDocument()
    );
  });
});
