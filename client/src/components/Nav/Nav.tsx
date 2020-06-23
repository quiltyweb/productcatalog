import React from "react";
import styled from "styled-components";

// TODO: avatar image can be as a background-image in the styled components,
// with a background-size: cover to preserve the aspect ratio.
const NavStyled = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0;
  min-height: 6rem;
  color: #D32F2F;
  background-color: #FFFFFF;
  transition-property: all;
  transition-duration: 0.3s;
  z-index: 99;
  min-height: 5rem;
`;

const NavDrawer = styled.div`
  position: fixed;
  top: 2rem;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.2s;
  background-color: #E0E0E0;
  transform: translateY(-80rem);

  @media (min-width: 760px) {
    display: none;
  }

  &.is-open {
    transform: translateY(4rem);
  }

  .ProductsList {
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;

    li {
      flex-basis: 33%;
      padding: 3rem 0;
      margin: 0;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }

  &-secondary {
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;

    li {
      flex-basis: 33%;
      padding: 3rem 0;
      margin: 0;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }
`;

const NavBar = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-grow: 1;
  z-index: 2;
  margin: 0;
  padding: 0;
  line-height: 1;
  list-style: none;
  max-width: 110rem;
  flex-direction: row;
`;

const NavBarToggle = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (min-width: 760px) {
    display: none;
  }

  &-label {
    margin-right: 1rem;
    font-size: 12px;
  }

  &-icon {
    position: relative;
    min-width: 2rem;
    margin: 0.6rem 0;
  }

  &-icon,
  &-icon::before,
  &-icon::after {
    border-top: 0.2rem solid #757575;
  }

  &-icon::before,
  &-icon::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
  }

  &-icon::before {
    top: -0.7rem;
  }

  &-icon::after {
    bottom: -0.5rem;
  }

  &.is-open {
    .NavBar-toggle-icon {
      border-color: transparent;
    }

    .NavBar-toggle-icon::before {
      top: -0.7rem;
      border-color: #D32F2F;
      transform: rotate(45deg) translateY(0.7rem);
    }

    .NavBar-toggle-icon::after {
      bottom: -0.5rem;
      border-color: #D32F2F;
      transform: rotate(-45deg) translateY(-0.7rem);
    }
  }
`;

const NavLogo = styled.a`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  transition-property: all;
  transition-duration: 0.2s;
 
  @media (min-width: 760px) {
    align-items: center;
    font-size: 4rem;
  }
 
  .NavLogo-legend {
    font-size: 1rem;
  }
`;

const NavBarList = styled.ul`
  outline: 1px solid blue;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  line-height: 1;
  list-style: none;
  margin: 1rem 2rem;

  li {
    display: block;
    margin: .5rem;
    font-size: 1rem;  
  }
`;

const Nav = () => {
  return (
    <NavStyled>
       <NavBar>
        <NavLogo>
          <span className="NavLogo-header">Gattoni</span>
          <span className="NavLogo-legend">Seguridad Industrial</span>
        </NavLogo>
        <NavBarList>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Mi Cotización
            </a>
          </li>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Cart
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
        <NavBarToggle>
          <span className="NavBar-toggle-label">Menu</span>
          <span className="NavBar-toggle-icon" />
        </NavBarToggle>
      </NavBar>
      <NavDrawer>
        {/* <ProductsList categories={[]} /> */}
        <ul className="NavDrawer-secondary">
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Mi Cotización
            </a>
          </li>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Contacto
            </a>
          </li>
          <li>
            <a href="www.gattoni.cl" className="NavBar-primary-link">
              Cart
            </a>
          </li>
        </ul>
      </NavDrawer>
    </NavStyled>
  );
};

export default Nav;
