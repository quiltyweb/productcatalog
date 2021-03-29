import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeadingLogo = styled.h1`
  padding: 0;
  margin: 0;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    line-height: 1.1;
  }
`;

const NavLogoHeading = styled.span`
  font-size: 2rem;
  font-weight: 800;
  background: -webkit-linear-gradient(#ffb300, #c71c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #c71c00;
  margin: 0 1.5rem;
  @media (min-width: 425px) {
    font-size: 2.4rem;
  }
`;

const NavLogoSubHeading = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  @media (min-width: 425px) {
    font-size: 1.2rem;
  }
`;

export const NavHeadingLogo: React.FunctionComponent = (): JSX.Element => {
  return (
    <HeadingLogo>
      <Link to="/">
        <NavLogoHeading>GATTONI</NavLogoHeading>
        <NavLogoSubHeading>Seguridad Industrial</NavLogoSubHeading>
      </Link>
    </HeadingLogo>
  );
};
