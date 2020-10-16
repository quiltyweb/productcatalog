import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { fetchQuery } from "react-relay";
import environment from "../../environment";
import { ReCaptcha } from "../ReCaptcha/ReCaptcha";
import {
  InputField,
  TextareaField,
  Paragraph,
  Alert,
  Spinner,
  styled,
  PageContent,
} from "bumbag";
import { Button } from "bumbag";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const SendQuoteLink = styled(Link)`
  display: block;
  text-align: right;
  color: #000;
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
      email: "",
      telefono: "",
      mensaje: "",
      recaptcha: "",
    },
    validate: ({ nombreCompleto, email, recaptcha }) => {
      const errors: any = {};
      if (!nombreCompleto) {
        errors["nombreCompleto"] = "Nombre o empresa es requerido";
      }
      if (!email) {
        errors["email"] = "Email es requerido";
      }
      if (!recaptcha) {
        errors["recaptcha"] = "Debe hacer click en el validador antispam!";
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
          name: values.nombreCompleto,
          emailAddress: values.email,
          phoneNumber: values.telefono,
          message: values.mensaje,
        },
        productsToQuote: newCartItems,
      };

      const variables = { input: inputArgs };

      fetchQuery(environment, query, variables).then(
        ({ sendQuoteRequest }: any) => {
          if (sendQuoteRequest.status === "FAILURE") {
            actions.setStatus({
              message: "Se ha producido un error, intente nuevamente.",
              error: true,
            });
            return;
          }

          actions.setStatus({
            message:
              "Su Cotización ha sido enviada con exito a Comercial Gattoni. Responderemos su pedido a la brevedad, Gracias.",
          });
        }
      );
    },
  });

  return (
    <PageContent breakpoint="desktop">
      <Paragraph>
        Campos marcados con{" "}
        <span style={{ color: "#da291c", fontWeight: "bolder" }}>
          asterisco (*)
        </span>{" "}
        son obligatorios.
      </Paragraph>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          padding="major-2"
          id="nombreCompleto"
          name="nombreCompleto"
          type="text"
          label="Nombre o Empresa"
          placeholder="ingrese su nombre completo"
          value={formik.values.nombreCompleto}
          onChange={formik.handleChange}
          validationText={formik.errors.nombreCompleto}
          state={formik.errors.nombreCompleto ? "danger" : "success"}
          size="default"
          isRequired
        />
        <InputField
          padding="major-2"
          id="email"
          name="email"
          type="email"
          label="E-mail"
          placeholder="example@email.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          validationText={formik.errors.email}
          state={formik.errors.email ? "danger" : "success"}
          size="default"
          isRequired
        />
        <InputField
          padding="major-2"
          id="telefono"
          name="telefono"
          type="text"
          label="Telefono"
          placeholder="Telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          validationText={formik.errors.telefono}
          state={formik.errors.telefono ? "danger" : "success"}
          size="default"
        />
        <TextareaField
          padding="major-2"
          name="mensaje"
          label="Observaciones Generales"
          value={formik.values.mensaje}
          onChange={formik.handleChange}
          validationText={formik.errors.mensaje}
          state={formik.errors.mensaje ? "danger" : "success"}
        />
        <div>
          Click en el botón para verificar antispam:
          <span style={{ color: "#da291c", fontWeight: "bolder" }}>*</span>
          <ReCaptcha
            onVerifyCaptcha={(response) => {
              formik.setFieldValue("recaptcha", response);
            }}
          />
          {formik.errors.recaptcha && formik.touched.recaptcha && (
            <Alert display="inline-block" type="danger">
              {formik.errors.recaptcha}
            </Alert>
          )}
        </div>
        <Button
          alignSelf="flex-end"
          margin="major-2"
          padding="major-1"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Enviar Cotización
        </Button>
        {formik.isSubmitting && !formik.status && (
          <Alert display="inline-block" type="warning">
            <Spinner size="small" /> Enviando...
          </Alert>
        )}
        {formik.status && formik.status.message && (
          <Alert
            display="inline-block"
            type={formik.status.error ? "danger" : "success"}
          >
            {formik.status.message}
            <SendQuoteLink to="/">Volver al inicio</SendQuoteLink>
          </Alert>
        )}
      </form>
    </PageContent>
  );
};

export default QuoteForm;
