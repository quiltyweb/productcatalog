import React from "react";
import { Heading, Paragraph } from "bumbag";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

export const PageNotFound = (): JSX.Element => {
  return (
    <PageWrapper title="Comercial Gattoni seguridad industrial - Página no encontrada">
      <>
        <Heading use="h2" fontSize="400" paddingBottom="1rem">
          Página no encontrada (error 404)
        </Heading>
        <Paragraph>
          La Página que intenta solicitar no esta disponible en el servidor.
        </Paragraph>
        <Paragraph>Pruebe mejor suerte en estos links:</Paragraph>
        <Paragraph>
          <Link style={{ textDecoration: "underline" }} to="/">
            Inicio
          </Link>
          <Link style={{ textDecoration: "underline" }} to="/contacto">
            Contacto
          </Link>
        </Paragraph>
      </>
    </PageWrapper>
  );
};
export default PageNotFound;
