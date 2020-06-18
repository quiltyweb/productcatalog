import React from "react";
import styled from "styled-components";

// TODO: avatar image can be as a background-image in the styled components,
// with a background-size: cover to preserve the aspect ratio.
const NavStyled = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0;
  min-height: 6rem;
  color: $primary-color-dark;
  background-color: $color-light;
  transition-property: all;
  transition-duration: 0.3s;
  z-index: 99;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    // background-image: url("../../assets/hills-7.svg");
    background-size: cover;
    background-repeat: repeat-x;
    background-position: center center;
  }

  @include break(md) {
    min-height: 15rem;

    &.is-fixed {
      transform: translateY(-5rem);
      background-position: center top;
      min-height: 12rem;

      .NavBar {
        margin-top: 5rem;
      }

      .NavLogo {
        font-size: 3.5rem;
      }

      .NavLogo-legend {
        font-size: 1.2rem;
      }
    }
  }
`;

const NavDrawer = styled.div`
  position: fixed;
  top: 2rem;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.2s;
  background-color: $color-grey--3;
  transform: translateY(-80rem);

  @include break(md) {
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
      border-bottom: 1px solid $color-light;
      border-right: 1px solid $color-light;
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
      border-bottom: 1px solid $color-light;
      border-right: 1px solid $color-light;
    }
  }
`;

const NavBar = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  z-index: 2;

  @include break(md) {
    max-width: $container-width-3;
  }

  &-primary {
    display: none;

    @include break(md) {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 1;
      list-style: none;
    }

    li {
      display: block;
      margin: $gutter-v/4 $gutter-h/4;

      @include break(lg) {
        margin: $gutter-v/2 $gutter-h;
      }
    }

    &-link {
      color: $primary-text-color;
    }

    &--column {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
    }
  }
`;

const NavBarToggle = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  @include break(md) {
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
    border-top: 0.2rem solid $secondary-text-color;
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
      border-color: $primary-color-dark;
      transform: rotate(45deg) translateY(0.7rem);
    }

    .NavBar-toggle-icon::after {
      bottom: -0.5rem;
      border-color: $primary-color-dark;
      transform: rotate(-45deg) translateY(-0.7rem);
    }
  }
`;

const NavLogo = styled.a`
   {
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

    @include break(md) {
      align-items: center;
      font-size: 12px;
    }
  }

  .NavLogo-legend {
    font-size: 1rem;

    @include break(md) {
      font-size: 12px;
    }
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
        <ul className="NavBar-primary">
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
        </ul>
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
