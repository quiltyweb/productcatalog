import React from "react";
import { useFormik } from "formik";
import { styled } from "fannypack";
import { Link, useHistory } from "react-router-dom";
import { Input, Button } from "fannypack";
import hillsSVg from "./hills.svg";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.7rem 0;
  background-color: #ffffff;
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center center;
  font-size: 0.9rem;

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
    grid-template-columns: auto 30% auto;
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
    font-size: 0.95rem;
  }
`;

const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  justify-self: center
  flex-direction: column;
  padding: 0;
  color: black;
  font-weight: bold;
  line-height: 1;
  @media (min-width: 768px) {
    justify-self: start
  }
`;

const NavLogoHeading = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  background: -webkit-linear-gradient(#ffb300, #c71c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #c71c00; // fallback color
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const NavLogoSubHeading = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
`;

const FormStyled = styled.form`
  display: flex;
  align-items: flex-end;
`;

const Quantity = styled.div`
  border-radius: 50px;
  background-color: rgb(255, 204, 0);
  color: #212121;
  width: auto;
  display: inline-block;
  padding: 0 0.4rem;
  margin: 0.3rem;
`;

const NavBarList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-weight: 500;
  color: #212121;

  li {
    text-align: center;
    margin: 0 0.9rem;
  }

  @media (min-width: 375px) {
    flex-direction: row;
    justify-content: flex-end;
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
            <Link to="/categoria/Q2F0ZWdvcnk6Nw==">Productos</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <FontAwesomeIcon
              style={{ marginRight: "0.2rem" }}
              size="lg"
              color="#777777"
              icon={faListUl}
            />
            <Link to="/cotizacion">
              Mi Cotización
              {cartCount > 0 && <Quantity> {cartCount}</Quantity>}
            </Link>
          </li>
        </NavBarList>
      </NavBarContent>
    </NavContainer>
  );
};

export default Nav;
