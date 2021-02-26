import React from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Button, TopNav } from "bumbag";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ItemLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: #212121;
  font-weight: 400;
`;

const HeadingLogo = styled.h1`
  padding: 0;
  margin: 0;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
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
  font-weight: 400;
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

const SearchForm = styled.form`
  display: flex;
  align-items: stretch;
`;

const SearchInput = styled.input`
  margin: 0 0.5rem;
`;

const Nav: React.FunctionComponent = (): JSX.Element => {
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
    <TopNav use="nav" style={{ alignItems: "center" }}>
      <HeadingLogo>
        <Link to="/">
          <NavLogoHeading>GATTONI</NavLogoHeading>
          <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
        </Link>
      </HeadingLogo>

      <SearchForm onSubmit={formik.handleSubmit}>
        <label htmlFor="searchTerm">Ingrese su búsqueda:</label>
        <SearchInput
          id="searchTerm"
          name="searchTerm"
          type="text"
          value={formik.values.searchTerm}
          onChange={formik.handleChange}
        />
        <Button type="submit" size="small">
          <FontAwesomeIcon
            aria-hidden={true}
            style={{ marginRight: "0.2rem" }}
            size="sm"
            color="#777777"
            icon={faSearch}
          />
          Buscar
        </Button>
      </SearchForm>

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
          <ItemLink to="/cotizacion">Mi Cotización</ItemLink>
          {cartCount > 0 && (
            <Quantity aria-label="productos agregados">{cartCount}</Quantity>
          )}
        </TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );
};

export default Nav;
