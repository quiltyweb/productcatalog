import React from "react";
import { Paragraph, Page } from "fannypack";
const Banner: React.FunctionComponent = (): JSX.Element => {
  return (
    <Page.Content
      breakpoint="widescreen"
      wrapperProps={{
        padding: "major-1",
        backgroundImage:
          "url('https://product-catalog.sfo2.cdn.digitaloceanspaces.com/assets/blooming-desert4.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "0% 18%",
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
