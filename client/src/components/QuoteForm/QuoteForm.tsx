import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { fetchQuery } from "react-relay";
import environment from "../../environment";
import {
  InputField,
  Button,
  Box,
  TextareaField,
  Heading,
  Paragraph,
  Alert,
  Spinner,
  styled,
} from "fannypack";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const SendQuoteLink = styled(Link)`
  display: block;
  text-align: right;
  color: black;
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap;
  padding: 1rem;
  transition: color 0.2s;
  text-decoration: underline;
  border-radius: 4px;
  color: #000000;
  &:hover {
    color: #ff0000;
    text-decoration: underline;
  }
`;

const query = graphql`
  query QuoteFormQuery($input: QuoteRequestInput!) {
    sendQuoteRequest(input: $input) {
      status
      message
    }
  }
`;

type ProductItemProps = {
  productId: string;
  quantity: number;
};

interface QuoteFormProps {
  cartItems: ProductItemProps[];
}

const QuoteForm: React.FunctionComponent<QuoteFormProps> = ({ cartItems }) => {
  const formik = useFormik({
    initialValues: {
      nombreCompleto: "",
      empresa: "",
      email: "",
      mensaje: "",
      telefono: "",
      ciudad: "",
      codigoArea: "",
    },
    validate: ({
      nombreCompleto,
      empresa,
      email,
      ciudad,
      codigoArea,
      telefono,
    }) => {
      const errors: any = {};
      if (!nombreCompleto) {
        errors["nombreCompleto"] = "Nombre o Razon social es requerido";
      }
      if (!empresa) {
        errors["empresa"] = "Empresa es requerido";
      }
      if (!email) {
        errors["email"] = "Email es requerido";
      }
      if (!ciudad) {
        errors["ciudad"] = "Ciudad es requerido";
      }
      if (!codigoArea) {
        errors["codigoArea"] = "codigo de Area es requerido";
      }
      if (!telefono) {
        errors["telefono"] = "Telefono es requerido";
      }

      return errors;
    },
    onSubmit: (values, actions) => {
      const newCartItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const inputArgs = {
        personalDetails: {
          personalIdNumber: values.nombreCompleto,
          emailAddress: values.email,
          message: values.mensaje,
          name: values.nombreCompleto,
          companyName: values.empresa,
          phoneNumber: values.telefono,
          city: values.ciudad,
        },
        productsToQuote: newCartItems,
      };

      const variables = { input: inputArgs };

      fetchQuery(environment, query, variables).then((data) => {
        actions.setStatus({
          message:
            "Su Cotización ha sido enviada con exito a Comercial Gattoni. Responderemos su pedido a la brevedad, Gracias.",
        });
        // TODO: clean react context or session storage after sending quote....
      });
    },
  });

  return (
    <Box marginTop="major-1">
      <Heading use="h2">Ingrese datos de su cotizacion</Heading>
      <Paragraph>
        Si está de acuerdo con el pedido, complete el formulario de cotización:
      </Paragraph>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          padding="major-2"
          id="nombreCompleto"
          name="nombreCompleto"
          isRequired
          type="text"
          label="Nombre Completo"
          placeholder="ingrese su nombre completo"
          value={formik.values.nombreCompleto}
          onChange={formik.handleChange}
          validationText={formik.errors.nombreCompleto}
          state={formik.errors.nombreCompleto ? "danger" : ""}
          size="default"
        />
        <InputField
          padding="major-2"
          id="empresa"
          name="empresa"
          isRequired
          type="text"
          label="Empresa"
          placeholder="Empresa"
          value={formik.values.empresa}
          onChange={formik.handleChange}
          validationText={formik.errors.empresa}
          state={formik.errors.empresa ? "danger" : ""}
          size="default"
        />
        <InputField
          padding="major-2"
          id="email"
          name="email"
          isRequired
          type="email"
          label="E-mail"
          placeholder="example@email.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          validationText={formik.errors.email}
          state={formik.errors.email ? "danger" : ""}
          size="default"
        />
        <InputField
          padding="major-2"
          id="telefono"
          isRequired
          name="telefono"
          type="text"
          label="Telefono"
          placeholder="Telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          validationText={formik.errors.telefono}
          state={formik.errors.telefono ? "danger" : ""}
          size="default"
        />
        <InputField
          padding="major-2"
          id="ciudad"
          name="ciudad"
          type="text"
          isRequired
          label="Ciudad"
          placeholder="ingrese su ciudad"
          value={formik.values.ciudad}
          onChange={formik.handleChange}
          validationText={formik.errors.ciudad}
          state={formik.errors.ciudad ? "danger" : ""}
          size="medium"
        />
        <InputField
          padding="major-2"
          id="codigoArea"
          name="codigoArea"
          isRequired
          width="30%"
          type="text"
          label="codigo de Area"
          value={formik.values.codigoArea}
          onChange={formik.handleChange}
          validationText={formik.errors.codigoArea}
          state={formik.errors.codigoArea ? "danger" : ""}
          size="default"
        />
        <TextareaField
          padding="major-2"
          name="mensaje"
          label="Observaciones Generales"
          value={formik.values.mensaje}
          onChange={formik.handleChange}
          validationText={formik.errors.mensaje}
          state={formik.errors.mensaje ? "danger" : ""}
        />
        <Button
          alignSelf="flex-end"
          margin="major-2"
          padding="major-1"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Enviar
        </Button>
        {formik.isSubmitting && !formik.status && (
          <Alert display="inline-block" hasTint type="warning">
            <Spinner size="small" /> Enviando...
          </Alert>
        )}
        {formik.status && formik.status.message && (
          <Alert display="inline-block" hasTint type="success">
            {formik.status.message}
            <SendQuoteLink to="/">Volver al inicio</SendQuoteLink>
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default QuoteForm;
