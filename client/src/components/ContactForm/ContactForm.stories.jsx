import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactForm from "./ContactForm";

const history = createMemoryHistory();

export default {
  title: "ContactForm",
  component: ContactForm,
};

export const ContactFormStory: React.VFC<any> = () => (
  <Router history={history}>
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
  </Router>
);

ContactFormStory.storyName = "I am the ContactFormStory";
