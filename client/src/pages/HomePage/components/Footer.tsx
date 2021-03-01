import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  List,
  PageContent,
  Columns,
  Column,
  Heading,
  Paragraph,
  Stack,
} from "bumbag";

const Footer = styled.footer`
  background-color: #212121;
  color: #ffffff;
  a {
    color: #ffffff;
    text-decoration: underline;
    &:hover {
      color: #ffcc00;
    }
    &:focus {
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }
  }
`;

const FooterComponent = (): JSX.Element => {
  const currDate = new Date();
  return (
    <Footer>
      <PageContent padding="3rem 0" breakpoint="widescreen">
        <Columns>
          <Column spread={5}>
            <Heading
              use="h3"
              fontSize="300"
              paddingBottom="1rem"
              variant="light-heading"
            >
              Somos seguridad industrial en Atacama.
            </Heading>
            <Paragraph paddingLeft="0" paddingRight="2rem">
              Somos una empresa con mas de 20 años de experiencia dedicada a la
              venta de artículos de Seguridad Industrial, ofreciendo a nuestros
              clientes productos de la más alta calidad como Botas de Agua,
              Mascaras de protección Respiratoria, servicios de Bordados
              industriales computacionales y más. <br />
              Distribuidores de Vicsa en Copiapó.
            </Paragraph>
          </Column>
          <Column spread={5}>
            <Heading
              use="h3"
              fontSize="300"
              paddingBottom="1rem"
              variant="light-heading"
            >
              Contáctenos
            </Heading>
            <Stack spacing="major-4">
              <Paragraph>Dirección: Rodriguez 757-A, Copiapó, Chile.</Paragraph>
              <Paragraph>
                <a
                  href="https://goo.gl/maps/T8kEzuyJijXt6iy66"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver dirección en el mapa
                </a>
              </Paragraph>
              <Paragraph>
                Teléfono: <a href="tel:52-2-218056">(52) 2 218056</a>
              </Paragraph>
              <Paragraph>
                Fax: <a href="tel:52-2-216257">(52) 2 216257</a>
              </Paragraph>
              <Paragraph>
                Correo Ventas:{" "}
                <img
                  style={{ verticalAlign: "middle" }}
                  src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/assets/email-ventas-comercial-gattoni-cl.jpg"
                  width="216"
                  height="23"
                  alt="comercialgattoni arroba gattoni punto cl"
                />
              </Paragraph>
            </Stack>
            <Heading
              use="h3"
              fontSize="300"
              paddingBottom="1rem"
              marginTop="3rem"
              variant="light-heading"
            >
              Horario de atención
            </Heading>
            <Paragraph>
              Lunes a Viernes de 9:30 AM a 13:30 PM y 15:30PM a 18:30PM
            </Paragraph>
          </Column>
          <Column>
            <List aria-label="Menu pie de pagina">
              <List.Item>
                <Link to="/categoria/Q2F0ZWdvcnk6Nw==">Productos</Link>
              </List.Item>
              <List.Item>
                <Link to="/contacto">Contacto</Link>
              </List.Item>
              <List.Item>
                <Link to="/cotizacion">Mi Cotización</Link>
              </List.Item>
              <List.Item>
                <Link to="/certificaciones">Certificaciones</Link>
              </List.Item>
            </List>
          </Column>
        </Columns>
      </PageContent>
      <PageContent
        breakpoint="widescreen"
        textAlign="center"
        padding="major-2"
        wrapperProps={{
          backgroundColor: "#212121",
          borderTop: "1px solid orange",
        }}
      >
        &copy; Todos los derechos reservados {currDate.getFullYear()} Comercial
        Gattoni.
      </PageContent>
    </Footer>
  );
};

export default FooterComponent;
