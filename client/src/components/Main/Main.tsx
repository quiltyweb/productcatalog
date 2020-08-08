import React from "react";
import { Heading, Paragraph, Page } from "fannypack";
import CategoryGrid from "../CategoryGrid/CategoryGrid";

type MainProps = {
  categories: any;
};

const Main: React.FunctionComponent<MainProps> = ({
  categories,
}): JSX.Element => {
  return (
    <>
      <Page.Content
        // isFluid
        breakpoint="desktop"
        wrapperProps={{ backgroundColor: "white800", padding: "major-0" }}
      >
        <Heading use="h1">Sómos Seguridad Industrial</Heading>
        <Paragraph>
          Comercial Gattoni le da la más cordial bienvenida y le invita a
          conocer su amplia gama de productos de seguridad Industrial. Somos una
          Empresa con más de 20 años de experiencia en el área de venta de
          artículos de Seguridad Industrial, ubicada en Copiapó, Región de
          Atacama.
        </Paragraph>
      </Page.Content>

      <Page.Content breakpoint="desktop">
        <Heading use="h2">Categoria de Productos</Heading>
        <CategoryGrid categoryGridItems={categories} />
      </Page.Content>
    </>
  );
};

export default Main;
