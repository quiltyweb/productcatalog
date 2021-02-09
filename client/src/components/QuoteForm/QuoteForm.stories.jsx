import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import QuoteForm from "./QuoteForm";

const history = createMemoryHistory();

export default {
  title: "QuoteForm",
  component: QuoteForm,
};

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

export const QuoteFormStory: React.VFC<any> = () => (
  <Router history={history}>
    <QuoteForm cartItems={mocked_cart} initialValues={mocked_initialValues} />
  </Router>
);

QuoteFormStory.storyName = "I am the QuoteFormStory";
