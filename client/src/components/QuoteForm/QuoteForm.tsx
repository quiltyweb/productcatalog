import React from "react";
import {
  InputField,
  Button,
  Box,
  TextareaField,
  Heading,
  Paragraph,
} from "fannypack";
import { useFormik } from "formik";

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
    onSubmit: (values) => {
      console.log("onSubmit", values);
      console.log("cartItems prop", cartItems);
    },
  });

  return (
    <Box marginTop="major-4">
      <Heading use="h2">Formulario de cotización:</Heading>
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
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default QuoteForm;
