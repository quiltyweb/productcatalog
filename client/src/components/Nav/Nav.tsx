import React, { useState, useEffect } from "react";
import { useFormik, FormikProps } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Button, TopNav } from "bumbag";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faSearch,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { createPortal } from "react-dom";

const TopNavigation = styled((props) => <TopNav {...props} />)`
  display: flex;
  align-items: center;
`;

const TopNavigationSection = styled((props) => <TopNav.Section {...props} />)`
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row;
  }
`;

const MenuContainer = styled.div`
  display: none;
  @media (min-width: 960px) {
    display: flex;
  }
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  background: #fafafa;
`;

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

const SearchLabel = styled.label`
  text-align: center;
  @media (min-width: 960px) {
    text-align: right;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 0.5rem 1rem;
  @media (min-width: 425px) {
    margin: 0 0.5rem;
    flex-direction: row;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  margin: 0 0.5rem;
  height: 36px;
`;

const MobileButton = styled((props) => <Button {...props} />)`
  display: block;
  margin: 0 0.5rem;
  @media (min-width: 960px) {
    display: none;
  }
`;

interface FormValues {
  searchTerm: string;
}

const NavSearchForm: React.FunctionComponent<FormikProps<FormValues>> = ({
  handleSubmit,
  handleChange,
  values,
}): JSX.Element => {
  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchLabel htmlFor="searchTerm">Ingrese su búsqueda:</SearchLabel>
      <SearchInput
        id="searchTerm"
        name="searchTerm"
        type="text"
        value={values.searchTerm}
        onChange={handleChange}
      />
      <Button type="submit" size="small" style={{ whiteSpace: "nowrap" }}>
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
  );
};

const NavList: React.FunctionComponent<{ cartCount: number }> = ({
  cartCount,
}): JSX.Element => {
  return (
    <TopNavigationSection>
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
    </TopNavigationSection>
  );
};

const NavHeadingLogo: React.FunctionComponent = (): JSX.Element => {
  return (
    <HeadingLogo>
      <Link to="/">
        <NavLogoHeading>GATTONI</NavLogoHeading>
        <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
      </Link>
    </HeadingLogo>
  );
};

const Modal: React.FunctionComponent<{
  children: JSX.Element;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: boolean;
}> = ({ children, setToggleMenu, toggleMenu }): JSX.Element | null => {
  return toggleMenu
    ? createPortal(
        <StyledModal>
          <div
            style={{
              display: "flex",
              height: "60px",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e6e6eb",
              marginBottom: "1rem",
            }}
          >
            <NavHeadingLogo />
            <Button
              type="button"
              size="small"
              aria-label="menu"
              style={{ margin: "0 0.5rem" }}
              onClick={() => {
                setToggleMenu(false);
              }}
            >
              <FontAwesomeIcon size="sm" color="#777777" icon={faTimes} />
            </Button>
          </div>
          {children}
        </StyledModal>,
        document.body
      )
    : null;
};

const Nav: React.FunctionComponent = (): JSX.Element => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { cartCount } = useHomePageContext();

  const history = useHistory();

  const formik = useFormik<FormValues>({
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

  useEffect(() => {
    history.listen(() => {
      setToggleMenu(false);
    });
  }, [history]);

  return (
    <TopNavigation use="nav">
      <NavHeadingLogo />
      <MenuContainer>
        <NavSearchForm {...formik} />
        <NavList cartCount={cartCount} />
      </MenuContainer>

      <MobileButton
        type="button"
        size="small"
        aria-label="menu"
        onClick={() => {
          setToggleMenu(!toggleMenu);
        }}
      >
        <FontAwesomeIcon size="sm" color="#777777" icon={faBars} />
      </MobileButton>
      <Modal setToggleMenu={setToggleMenu} toggleMenu={toggleMenu}>
        <>
          <NavSearchForm {...formik} />
          <NavList cartCount={cartCount} />
        </>
      </Modal>
    </TopNavigation>
  );
};

export default Nav;
