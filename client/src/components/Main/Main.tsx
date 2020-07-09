import React from 'react'
import { Columns, Column, Heading, Paragraph } from 'fannypack'
import Card from "../../components/Card/Card";

const Main = () => {
  return (
    <>
      <Heading>Sómos Seguridad Industrial</Heading>
      <Heading use="h2">Con más de 20 años de experiencia en la Región de Atacama.</Heading>
      <Paragraph>
        Comercial Gattoni le da la más cordial bienvenida y le invita a conocer
        su amplia gama de productos de seguridad Industrial. Somos una Empresa
        con más de 20 años de experiencia en el área de venta de artículos de
        Seguridad Industrial, ubicada en Copiapó, Región de Atacama.
      </Paragraph>
      <Paragraph>
        Ofrecemos a Ud. y empresa productos de la más alta calidad como Botas de
        Agua, Mascaras de protección Respiratoria, servicios de Bordados
        industriales computacionales y más. Distribuidores de Vicsa en Copiapó.
      </Paragraph>
      <Heading use="h2" id="heading-destacados">Productos Destacados:</Heading>
      <Columns aria-labelledby="heading-destacados">
        <Column>
          <Card
            name="Lente l-300"
            description="lorem ipsum"
            linkImage="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/LENTE%20SEGURIDAD%20L300.jpg"
          />
        </Column>
        <Column>
          <Card
            name="Guante Respirador 2 vias m500 masprot"
            description="lorem ipsum"
            linkImage="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/i%CC%81ndice.jpg"
          />
        </Column>
        <Column>
          <Card
            name="Botin negro economico pu-100"
            description="lorem ipsum"
            linkImage="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/SAMARA.jpg"
          />
        </Column>
      </Columns>
    </>
  )
}

export default Main
