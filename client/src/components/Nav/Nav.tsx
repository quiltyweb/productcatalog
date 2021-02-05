import React from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Label, Button, TopNav, InputField, Heading } from "bumbag";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ItemLink = styled(Link)`
  text-decoration: none;
  color: #212121;
`;

const HeadingLogo = styled(Heading)`
  display: flex;
  align-items: center;
  justify-self: center;
  padding: 1rem;
`;

const NavLogoHeading = styled.span`
  font-size: 2rem;
  font-weight: 800;
  background: -webkit-linear-gradient(#ffb300, #c71c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #c71c00;
  margin: 0 0.5rem;
`;

const NavLogoSubHeading = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
`;

const Quantity = styled.div`
  border-radius: 50px;
  background-color: rgb(255, 204, 0);
  color: #212121;
  min-width: 38px;
  text-align: center;
  display: inline-block;
  padding: 0 0.3rem;
  margin: 0.2rem;
`;

const Nav = (): JSX.Element => {
  const { cartCount } = useHomePageContext();

  const history = useHistory();

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
    <TopNav use="nav">
      <Link to="/" title="Gattoni" style={{ textDecoration: "none" }}>
        <HeadingLogo use="h1">
          <NavLogoHeading>GATTONI</NavLogoHeading>
          <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
        </HeadingLogo>
      </Link>

      <TopNav.Section>
        <TopNav.Item>
          <form onSubmit={formik.handleSubmit}>
            <Label htmlFor="searchTerm" display="flex" alignItems="center">
              Buscar en catálogo:
              <InputField
                id="searchTerm"
                name="searchTerm"
                type="text"
                value={formik.values.searchTerm}
                onChange={formik.handleChange}
                aria-label="Buscar"
                size="small"
                addonAfter={
                  <Button type="submit" size="small">
                    <FontAwesomeIcon
                      style={{ marginRight: "0.2rem" }}
                      size="sm"
                      color="#777777"
                      icon={faSearch}
                    />
                    Buscar
                  </Button>
                }
              />
            </Label>
          </form>
        </TopNav.Item>
      </TopNav.Section>

      <TopNav.Section>
        <TopNav.Item margin="0 1rem">
          <ItemLink to="/categoria/Q2F0ZWdvcnk6Nw==">Productos</ItemLink>
        </TopNav.Item>
        <TopNav.Item margin="0 1rem">
          <ItemLink to="/contacto">Contacto</ItemLink>
        </TopNav.Item>
        <TopNav.Item margin="0 1rem">
          <FontAwesomeIcon
            style={{ marginRight: "0.2rem" }}
            size="sm"
            color="#777777"
            icon={faListUl}
          />
          <ItemLink to="/cotizacion">
            Mi Cotización {cartCount > 0 && <Quantity> {cartCount}</Quantity>}
          </ItemLink>
        </TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );
};

export default Nav;
