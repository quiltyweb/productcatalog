import React from "react";
import { Paragraph, Page } from "fannypack";

const Banner: React.FunctionComponent = (): JSX.Element => {
  return (
    <Page.Content
      breakpoint="widescreen"
      wrapperProps={{
        padding: "major-1",
        background: "linear-gradient(90deg, #ff8a00, #f9c100)",
        color: "#FFFFFF",
      }}
    >
      <Paragraph
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: "bold",
        }}
      >
        Sómos Seguridad Industrial en la Región de Atacama.
      </Paragraph>
    </Page.Content>
  );
};

export default Banner;
