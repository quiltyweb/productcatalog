import React from 'react';
import { styled, palette, Columns, Column, space } from "fannypack";
 
const FooterContainer = styled.footer`
  margin-top: ${space(2, 'major')}rem;
  background-color: ${palette('white800')};
`;

const FooterAddress = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  align-self: end;
  align-items: flex-start;

  @media (min-width: 760px) {
    align-items: flex-end; 
    text-align: right;
  }
`;

const FooterLinks  = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: .5rem 0;
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

const FooterComponent = () => {
  const currDate = new Date();
  return (
    <FooterContainer>
      <Columns padding="major-3">
        <Column>
        <FooterLinks>
          <FooterList aria-label="Menu pie de pagina">
            <li><a href="/mi-cotizacion" className="NavBar-primary-link">Mi Cotización</a></li>
            <li><a href="/certificaciones" className="NavBar-primary-link">Certificaciones</a></li>
            <li><a href="/contacto" className="NavBar-primary-link">Contacto</a></li>
          </FooterList>
        </FooterLinks>
        </Column>
        <Column>
        <FooterAddress itemScope itemType="http://schema.org/LocalBusiness">
          <p><strong>Nuestra Dirección:</strong></p>
          <p itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
            <span itemProp="streetAddress">Rodriguez 757-A </span>
            <span itemProp="addressLocality">Copiapó, </span>
            <span itemProp="addressRegion">Región de Atacama, Chile.</span>
          </p>
          <p itemProp="telephone">Teléfono: <a href="tel:52-2-218056">52-2-218056</a></p>
          <p itemProp="faxNumber">Fax: <a href="tel:52-2-216257">52-2-216257</a></p>
          <p>&copy; Todos los derechos reservados {currDate.getFullYear()} Comercial Gattoni.</p>
        </FooterAddress>
        </Column>
      </Columns>
    </FooterContainer>
  );
};

export default FooterComponent;
