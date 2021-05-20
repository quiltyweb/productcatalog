import React from "react";
import styled from "styled-components";
import { Box } from "bumbag";

type MainProps = {
  children: JSX.Element;
};

const MainContainer = styled.main`
  margin: 3rem auto;
  @media (min-width: 768px) {
    flex-basis: 80%;
    margin: 0.5rem auto;
  }
`;

const Main: React.FunctionComponent<MainProps> = ({
  children,
}): JSX.Element => {
  return (
    <MainContainer>
      <Box>{children}</Box>
    </MainContainer>
  );
};

export default Main;
