import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Button, TopNav } from "bumbag";
import { useHomePageContext } from "../../context/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { NavSearchForm } from "./components/NavSeachForm";
import { NavHeadingLogo } from "./components/NavHeadingLogo";
import { NavList } from "./components/NavList";
import FocusTrap from "focus-trap-react";

const TopNavigation = styled((props) => <TopNav {...props} />)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 960px) {
    justify-content: space-between;
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

const MobileButton = styled.button`
  display: block;
  margin: 0 0.5rem;
  @media (min-width: 960px) {
    display: none;
  }
`;

const Quantity = styled.div`
  border-radius: 50px;
  background-color: rgb(255, 204, 0);
  color: #212121;
  min-width: 38px;
  text-align: center;
  display: inline-block;
  padding: 0;
  margin: 0;
`;

const MobileQuoteLink = styled((props) => <Link {...props} />)`
  display: flex;
  align-items: center;
  text-decoration: none;
  @media (min-width: 960px) {
    display: none;
  }
`;

interface FormValues {
  searchTerm: string;
}

const MobileModal: React.FunctionComponent<{
  children: JSX.Element;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: boolean;
  setFocusToMenuButton: () => void;
}> = ({
  children,
  setToggleMenu,
  toggleMenu,
  setFocusToMenuButton,
}): JSX.Element | null => {
  return toggleMenu
    ? createPortal(
        <FocusTrap>
          <StyledModal>
            <div
              style={{
                display: "flex",
                height: "80px",
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
                aria-label="close menu"
                style={{ margin: "0 0.5rem" }}
                onClick={() => {
                  setToggleMenu(false);
                  setFocusToMenuButton();
                }}
              >
                <FontAwesomeIcon size="sm" color="#777777" icon={faTimes} />
              </Button>
            </div>
            {children}
          </StyledModal>
        </FocusTrap>,
        document.body
      )
    : null;
};

const Nav: React.FunctionComponent = (): JSX.Element => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { cartCount } = useHomePageContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hamburgerMenuButtonRef = useRef<HTMLButtonElement>(null);

  const history = useHistory();

  const formik = useFormik<FormValues>({
    initialValues: {
      searchTerm: "",
    },
    validate: ({ searchTerm }) => {
      const errors: any = {};
      if (!searchTerm || searchTerm === "") {
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

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [toggleMenu]);

  const setFocusToMenuButton = () => {
    if (hamburgerMenuButtonRef.current) {
      hamburgerMenuButtonRef.current.focus();
    }
  };

  return (
    <TopNavigation use="nav">
      <NavHeadingLogo />
      <MenuContainer>
        <NavSearchForm {...formik} />
        <NavList cartCount={cartCount} />
      </MenuContainer>

      <div style={{ display: "flex" }}>
        <MobileQuoteLink to="/cotizacion">
          <FontAwesomeIcon
            style={{ marginRight: "0.2rem" }}
            size="sm"
            color="#777777"
            icon={faCartPlus}
          />

          {cartCount > 0 && (
            <Quantity aria-label="productos agregados">{cartCount}</Quantity>
          )}
        </MobileQuoteLink>

        <MobileButton
          type="button"
          aria-label="menu"
          onClick={() => {
            setToggleMenu(!toggleMenu);
          }}
          ref={hamburgerMenuButtonRef}
        >
          <FontAwesomeIcon size="sm" color="#777777" icon={faBars} />
        </MobileButton>
      </div>
      <MobileModal
        setToggleMenu={setToggleMenu}
        toggleMenu={toggleMenu}
        setFocusToMenuButton={setFocusToMenuButton}
      >
        <>
          <NavSearchForm {...formik} ref={searchInputRef} />
          <NavList cartCount={cartCount} />
        </>
      </MobileModal>
    </TopNavigation>
  );
};

export default Nav;
