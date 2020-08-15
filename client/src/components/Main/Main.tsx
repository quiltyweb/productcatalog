import React from "react";
import { Heading, Page, styled } from "fannypack";
import CategoryGrid from "../CategoryGrid/CategoryGrid";

type MainProps = {
  categories: any;
};
const StyledHeading = styled(Heading)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1.7rem;
  padding-bottom: 2rem;
  &:after {
    content: "";
    border-bottom: 3px solid #e16204;
    padding-top: 10px;
    width: 220px;
  }
`;
const Main: React.FunctionComponent<MainProps> = ({
  categories,
}): JSX.Element => {
  return (
    <>
      <Page.Content breakpoint="widescreen">
        <StyledHeading use="h1">Nuestros Productos</StyledHeading>
        <CategoryGrid categoryGridItems={categories} />
      </Page.Content>
    </>
  );
};

export default Main;
