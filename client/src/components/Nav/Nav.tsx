import React from "react";
import { styled } from "fannypack";
// import hillsSVg from './hills.svg';

// TODO: avatar image can be as a background-image in the styled components,
// with a background-size: cover to preserve the aspect ratio.
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 5rem;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0;
  color: #D32F2F;
  background-color: #FFFFFF;

  @media (min-width: 760px) {
    flex-direction: row;
   }
`;

const NavBarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  flex-grow: 1;
  max-width: 110rem;
  margin: 0;
  padding: 0 2rem;


  @media (min-width: 760px) {
    flex-direction: row;
   }

`;

const NavLogo = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
`;

const NavLogoHeading = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: #D32F2F;
`;

const NavLogoSubHeading= styled.span`
  font-size: 1rem;
`;
const NavBarList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;


  @media (min-width: 760px) {
    flex-direction: row;
   }

`;

const Nav = () => {
  return (
    <NavContainer>
       <NavBarContent>
        <NavLogo href="/" title="Gattoni">
          <NavLogoHeading>GATTONI</NavLogoHeading>
          <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
        </NavLogo>
        <NavBarList aria-label="Menu principal">
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Mi Cotización
            </a>
          </li>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Carrito
            </a>
          </li>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Certificaciones
            </a>
          </li>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Contacto
            </a>
          </li>
        </NavBarList>
      </NavBarContent>
    </NavContainer>
  );
};

export default Nav;
