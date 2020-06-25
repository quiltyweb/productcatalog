import React from 'react';
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  background-color: #FAFAFA;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const FooterAddress = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  align-self: end;
  align-items: flex-end;
  text-align: right;
`;

const FooterLinks  = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0;
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
      <FooterContent>
        <FooterLinks>
          <h3>Links</h3>
          <FooterList aria-label="Menu pie de pagina">
            <li><a href="/mi-cotizacion" className="NavBar-primary-link">Mi Cotización</a></li>
            <li><a href="/certificaciones" className="NavBar-primary-link">Certificaciones</a></li>
            <li><a href="/contacto" className="NavBar-primary-link">Contacto</a></li>
          </FooterList>
        </FooterLinks>
        <FooterAddress itemScope itemType="http://schema.org/LocalBusiness">
          <h3 itemProp="name">Comercial Gattoni</h3>
          <span itemProp="description"> Seguridad Industrial y Ropa de Trabajo.</span>
          <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
            <span itemProp="streetAddress">Rodriguez 757-A, </span>
            <span itemProp="addressLocality">Copiapó - </span>
            <span itemProp="addressRegion">Región de Atacama - Chile</span>
          </div>
          <p>Teléfono: <span itemProp="telephone">52-2-218056</span></p>
          <p>Fax: <span itemProp="faxNumber">52-2-216257</span></p>
          <p className="Footer-copyright">{currDate.getFullYear()} © Comercial Gattoni Seguridad Industrial, <br /> Todos los derechos Reservados</p>
        </FooterAddress>
      </FooterContent>
    </FooterContainer>
  );
};

export default FooterComponent;
