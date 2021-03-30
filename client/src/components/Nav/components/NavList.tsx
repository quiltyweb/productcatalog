import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TopNav } from "bumbag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const TopNavigationSection = styled((props) => <TopNav.Section {...props} />)`
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row;
  }
`;

const ItemLink = styled((props) => <Link {...props} />)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #212121;
  font-weight: 400;
  width: 100%;
  text-align: center;
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
type NavListItems = {
  label: string;
  linkTo: string;
  icon?: () => JSX.Element;
  component?: () => JSX.Element;
};

export const NavList: React.FunctionComponent<{ cartCount: number }> = ({
  cartCount,
}): JSX.Element => {
  const navListItems: NavListItems[] = [
    { label: "Inicio", linkTo: "/" },
    {
      label: "Productos",
      linkTo: "/categoria/Q2F0ZWdvcnk6Nw==",
    },
    {
      label: "Contacto",
      linkTo: "/contacto",
    },
    {
      label: "Mi Cotización",
      linkTo: "/cotizacion",
      icon: (): JSX.Element => (
        <FontAwesomeIcon
          style={{ marginRight: "0.2rem" }}
          size="sm"
          color="#777777"
          icon={faCartPlus}
        />
      ),
      component: (): JSX.Element => (
        <div>
          {cartCount > 0 && (
            <Quantity aria-label="productos agregados">{cartCount}</Quantity>
          )}
        </div>
      ),
    },
  ];
  return (
    <TopNavigationSection data-testid="top-navigation-section">
      {navListItems.map(({ linkTo, icon, label, component }, index) => {
        return (
          <TopNav.Item key={linkTo} margin="0 0.8rem">
            <ItemLink to={linkTo}>
              {icon && icon()}
              {label && label}
              {component && component()}
            </ItemLink>
          </TopNav.Item>
        );
      })}
    </TopNavigationSection>
  );
};
