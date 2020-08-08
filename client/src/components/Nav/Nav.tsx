import React from "react";
import { useFormik } from "formik";
import { styled } from "fannypack";
import { Link, useHistory } from "react-router-dom";
import { Input, Button } from "fannypack";
import hillsSVg from "./hills.svg";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";

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
  padding: 1rem 0;
  color: #d32f2f;
  background-color: #ffffff;
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center center;

  @media (min-width: 760px) {
    flex-direction: row;
  }
`;

const NavBarContent = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  grid-gap: 1rem;
  width: 100%;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    grid-template-columns: auto 35% auto;
    grid-template-rows: auto;
    padding: 0;
  }
`;

const NavInput = styled(Input)`
  input {
    background-color: #ececec;
    border-color: #ececec;
    border-radius: 20px;
    height: 44px;
    width: 100%;
    font-size: 1rem;
  }
`;

const NavLogo = styled(Link)`
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
  font-size: 2rem;
  font-weight: bold;
  background: -webkit-linear-gradient(#ffb300, #c71c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 3.1rem;
  }
`;

const FormStyled = styled.form`
  display: flex;
  align-items: flex-end;
`;
const NavLogoSubHeading = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: #000000;
`;
const NavBarList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  padding: 0;
  font-weight: 500;

  li {
    text-align: center;
  }

  @media (min-width: 425px) {
    flex-direction: row;
  }
`;

const Nav = () => {
  const { cartCount } = useHomePageContext();

  var history = useHistory();

  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validate: ({ searchTerm }) => {
      const errors: any = {};
      if (!searchTerm) {
        errors["searchTerm"] = "Busqueda es requerido";
      }
      return errors;
    },
    onSubmit: (values) => {
      return history.push(`/resultados/${values.searchTerm}`);
    },
  });

  return (
    <NavContainer style={{ backgroundImage: `url(${hillsSVg})` }}>
      <NavBarContent>
        <NavLogo to="/" title="Gattoni">
          <NavLogoHeading>GATTONI</NavLogoHeading>
          <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
        </NavLogo>
        <FormStyled
          onSubmit={formik.handleSubmit}
          style={{ alignItems: "center" }}
        >
          <NavInput
            a11yLabel="Buscador"
            id="searchTerm"
            name="searchTerm"
            type="text"
            placeholder="Busque en nuestro catalogo"
            value={formik.values.searchTerm}
            onChange={formik.handleChange}
            state={formik.errors.searchTerm ? "danger" : ""}
            size="small"
          />

          <Button
            margin="major-1"
            padding="major-1"
            size="small"
            type="submit"
            whiteSpace="noWrap"
            borderRadius="10px"
          >
            buscar
          </Button>
        </FormStyled>
        <NavBarList aria-label="Menu principal">
          <li>
            <Link
              to="/categoria/Q2F0ZWdvcnk6Nw=="
              className="NavBar-primary-link"
            >
              Productos
            </Link>
          </li>
          <li>
            <Link to="/certificaciones" className="NavBar-primary-link">
              Certificaciones
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="NavBar-primary-link">
              Contacto
            </Link>
          </li>
          <li>
            <Link to="/cotizacion" className="NavBar-primary-link">
              Mi Cotización ({cartCount})
            </Link>
          </li>
        </NavBarList>
      </NavBarContent>
    </NavContainer>
  );
};

export default Nav;
