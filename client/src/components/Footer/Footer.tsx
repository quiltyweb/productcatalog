import React from "react";
import {
  styled,
  Columns,
  Column,
  space,
  Heading,
  Paragraph,
  Box,
} from "fannypack";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  margin-top: ${space(2, "major")}rem;
  background-color: #212121;
  color: #fff;
  a {
    color: #fff;
    text-decoration: underline;
    &:hover {
      color: #ffcc00;
    }
    &:focus {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0;
`;

const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  line-height: 1;
  list-style: none;
  margin: 0;
  padding: 0;
}`;

// maxWidth: "1200px",  margin: "0 auto"
const FooterComponent = () => {
  const currDate = new Date();
  return (
    <FooterContainer>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Columns padding="major-6">
          <Column spread={5}>
            <Heading use="h3" fontSize="1.3rem">
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
            <Heading fontSize="1.3rem" use="h3">
              Contáctenos
            </Heading>
            <Box>
              <Paragraph>
                Rodriguez 757-A, Copiapó, Chile{" "}
                <a
                  href="https://goo.gl/maps/T8kEzuyJijXt6iy66"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ver mapa
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
            </Box>
            <Heading marginTop="1rem" fontSize="1.3rem" use="h3">
              Horario de atención
            </Heading>
            <Paragraph>
              Lunes a Viernes de 9:30 AM a 13:30 PM y 15:30PM a 18:30PM
            </Paragraph>
          </Column>
          <Column>
            <FooterLinks>
              <FooterList aria-label="Menu pie de pagina">
                <li>
                  <Link to="/categoria/Q2F0ZWdvcnk6Nw==">Productos</Link>
                </li>
                <li>
                  <Link to="/cotizacion">Mi Cotización</Link>
                </li>
                <li>
                  <Link to="/certificaciones">Certificaciones</Link>
                </li>
                <li>
                  <Link to="/contacto">Contacto</Link>
                </li>
              </FooterList>
            </FooterLinks>
          </Column>
        </Columns>
      </div>
      <Columns padding="major-2" backgroundColor="#e16204" color="#FFF">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          &copy; Todos los derechos reservados {currDate.getFullYear()}{" "}
          Comercial Gattoni.
        </div>
      </Columns>
    </FooterContainer>
  );
};

export default FooterComponent;
