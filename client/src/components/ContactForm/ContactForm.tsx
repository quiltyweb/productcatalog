import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { fetchQuery } from "react-relay";
import environment from "../../environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  InputField,
  Box,
  TextareaField,
  Heading,
  Alert,
  Spinner,
  Columns,
  Column,
  PageContent,
  Paragraph,
  ActionButtons,
  Flex,
} from "bumbag";
import { useFormik } from "formik";
import { ReCaptcha } from "../ReCaptcha/ReCaptcha";

const query = graphql`
  query ContactFormQuery(
    $personalIdNumber: String!
    $emailAddress: String!
    $message: String!
    $name: String
    $phoneNumber: String
  ) {
    sendContactMessage(
      personalIdNumber: $personalIdNumber
      emailAddress: $emailAddress
      message: $message
      name: $name
      phoneNumber: $phoneNumber
    ) {
      status
      message
    }
  }
`;

const ContactForm: React.FunctionComponent<{
  initialValues: {
    nombre: string;
    empresa: string;
    email: string;
    mensaje: string;
    telefono: string;
    recaptcha: string;
  };
}> = ({ initialValues }): JSX.Element => {
  const formik = useFormik({
    initialValues: initialValues,
    validate: ({ nombre, empresa, email, mensaje, recaptcha }) => {
      const errors: any = {};

      if (!nombre) {
        errors["nombre"] = "Nombre es requerido";
      }
      if (!empresa) {
        errors["empresa"] = "Empresa es requerido";
      }
      if (!email) {
        errors["email"] = "Email es requerido";
      }
      if (!mensaje) {
        errors["mensaje"] = "Mensaje es requerido";
      }
      if (!recaptcha) {
        errors["recaptcha"] = "Debe hacer click en el validador antispam!";
      }
      return errors;
    },
    onSubmit: (values, actions) => {
      const variables = {
        personalIdNumber: values.email,
        emailAddress: values.email,
        message: values.mensaje,
        name: values.nombre,
        phoneNumber: values.telefono,
      };

      fetchQuery(environment, query, variables)
        .then(({ sendContactMessage }: any) => {
          if (sendContactMessage.status === "FAILURE") {
            actions.setStatus({
              message: "Se ha producido un error, intente nuevamente.",
              error: true,
            });
            return;
          }
          actions.setStatus({
            message:
              "Su consulta ha sido enviada con exito a Comercial Gattoni. Responderemos a la brevedad, Gracias.",
          });
        })
        .catch((e: any) => {
          actions.setStatus({
            message: "Se ha producido un error, intente nuevamente.",
            error: true,
          });
        });
    },
  });

  return (
    <PageContent breakpoint="desktop">
      <Heading use="h2" fontSize="400" paddingBottom="1rem">
        Ingrese su consulta
      </Heading>
      <Paragraph paddingBottom="2rem">
        También puede contactarnos vía nuestro fono ventas llamando al:{" "}
        <FontAwesomeIcon
          style={{ margin: "0 0.5rem" }}
          size="lg"
          color="#777777"
          icon={faPhone}
        />
        <a href="tel:52-2-218056">(52) 2 218056</a>
      </Paragraph>
      <Paragraph>
        Campos marcados con{" "}
        <span style={{ color: "#da291c", fontWeight: "bolder" }}>
          asterisco (*)
        </span>{" "}
        son obligatorios.
      </Paragraph>
      <Columns>
        <Column spread={8}>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <InputField
                padding="major-2"
                id="nombre"
                name="nombre"
                isRequired
                type="text"
                label="Nombre"
                placeholder="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                validationText={
                  formik.errors.nombre && formik.touched.nombre
                    ? "campo requerido"
                    : undefined
                }
                state={
                  formik.errors.nombre && formik.touched.nombre
                    ? "danger"
                    : undefined
                }
                size="medium"
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
                onBlur={formik.handleBlur}
                validationText={
                  formik.errors.empresa && formik.touched.empresa
                    ? "campo requerido"
                    : undefined
                }
                state={
                  formik.errors.empresa && formik.touched.empresa
                    ? "danger"
                    : undefined
                }
                size="medium"
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
                onBlur={formik.handleBlur}
                validationText={
                  formik.errors.email && formik.touched.email
                    ? "campo requerido"
                    : undefined
                }
                state={
                  formik.errors.email && formik.touched.email
                    ? "danger"
                    : undefined
                }
                size="medium"
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
                onBlur={formik.handleBlur}
                validationText={
                  formik.errors.telefono && formik.touched.telefono
                    ? "campo requerido"
                    : undefined
                }
                state={
                  formik.errors.telefono && formik.touched.telefono
                    ? "danger"
                    : undefined
                }
                size="medium"
              />
              <TextareaField
                padding="major-2"
                name="mensaje"
                label="Consulta"
                isRequired
                value={formik.values.mensaje}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                validationText={
                  formik.errors.mensaje && formik.touched.mensaje
                    ? "campo requerido"
                    : undefined
                }
                state={
                  formik.errors.mensaje && formik.touched.mensaje
                    ? "danger"
                    : undefined
                }
              />
              <Flex alignItems="center">
                <label htmlFor="ReCaptcha-contact-form">
                  Click en el botón para verificar antispam:
                  <span style={{ color: "#da291c", fontWeight: "bolder" }}>
                    *
                  </span>
                </label>
                <ReCaptcha
                  id="ReCaptcha-contact-form"
                  onVerifyCaptcha={(response) => {
                    formik.setFieldValue("recaptcha", response);
                  }}
                />
                {formik.errors.recaptcha && formik.touched.recaptcha && (
                  <Alert display="inline-block" variant="tint" type={"danger"}>
                    {formik.errors.recaptcha}
                  </Alert>
                )}
              </Flex>

              <Flex justifyContent="space-between">
                <ActionButtons
                  onClickCancel={() => formik.resetForm()}
                  palette="secondary"
                  type="submit"
                />

                {formik.isSubmitting && !formik.status && (
                  <Alert display="inline-block" variant="tint" type="warning">
                    <Spinner size="small" /> Enviando...
                  </Alert>
                )}
                {formik.status && formik.status.message && (
                  <Alert
                    display="inline-block"
                    variant="tint"
                    type={formik.status.error ? "danger" : "success"}
                  >
                    {formik.status.message}
                  </Alert>
                )}
              </Flex>
            </form>
          </Box>
        </Column>
      </Columns>
    </PageContent>
  );
};

export default ContactForm;
