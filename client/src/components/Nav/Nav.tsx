import React from "react";
import { useFormik } from "formik";
import { styled } from "fannypack";
import { Link, useHistory } from "react-router-dom";
import { InputField, Button } from "fannypack";
// import hillsSVg from './hills.svg';
import { useHomePageContext } from '../../pages/HomePage/HomePageContext';

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
  color: #d32f2f;
  background-color: #ffffff;

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
  color: #d32f2f;
`;

const FormStyled = styled.form`
  display: flex;
  align-items: flex-end;
`;
const NavLogoSubHeading = styled.span`
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
    <NavContainer>
      <NavBarContent>
        <NavLogo href="/" title="Gattoni">
          <NavLogoHeading>GATTONI</NavLogoHeading>
          <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
        </NavLogo>

        <FormStyled onSubmit={formik.handleSubmit}>
          <InputField
            padding="major-1"
            id="searchTerm"
            name="searchTerm"
            type="text"
            label="Buscar"
            placeholder="ingrese busqueda"
            value={formik.values.searchTerm}
            onChange={formik.handleChange}
            validationText={formik.errors.searchTerm}
            state={formik.errors.searchTerm ? "danger" : ""}
            size="medium"
            isRequired
          />
          <Button margin="major-1" padding="major-1" type="submit">
            buscar
          </Button>
        </FormStyled>
        <NavBarList aria-label="Menu principal">
          <li>
            <Link to="/cotizacion" className="NavBar-primary-link">
              Mi Cotización ({cartCount})
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
        </NavBarList>
      </NavBarContent>
    </NavContainer>
  );
};

export default Nav;
