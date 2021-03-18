import React, { useState } from "react";
import { Card, Image, Paragraph, Button } from "bumbag";
import styled from "styled-components";
import { useHomePageContext } from "../../context/HomePageContext";
import { Link } from "react-router-dom";

const ImageStyled = styled(Image)`
  max-width: 100%;
  max-height: 160px;
  @media (min-width: 1020px) {
    max-width: 180px;
  }
`;

const SingleImageStyled = styled(Image)`
  max-width: 100%;
  max-height: 400px;
  margin-right: 0.5rem;
`;

interface ProductCardProps {
  productId: string;
  name: string;
  linkImage: string;
  description?: string;
  attachmentPath?: string;
  hasPrintCTA?: boolean;
  isSinglePage?: boolean;
}

const ImgWithFallback: React.FunctionComponent<{
  src: string;
  alt: string;
  isSinglePage?: boolean;
}> = ({ src, alt, isSinglePage }) => {
  const [isUndefined, setIsUndefined] = useState(false);

  const onError = (): void => {
    setIsUndefined(true);
  };

  if (isUndefined) {
    return (
      <img
        src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/noimagen.jpg"
        alt={alt}
        title={alt}
      />
    );
  }

  if (isSinglePage)
    return (
      <SingleImageStyled src={src} alt={alt} title={alt} onError={onError} />
    );

  return <ImageStyled src={src} alt={alt} title={alt} onError={onError} />;
};

export const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  productId,
  name,
  linkImage,
  description,
  attachmentPath,
  hasPrintCTA,
  isSinglePage,
}): JSX.Element => {
  const { addCartItem } = useHomePageContext();

  return (
    <Card
      standalone
      flex="1"
      display="flex"
      flexDirection="column"
      variant="bordered"
      padding="major-1"
    >
      <Card.Header>
        <Card.Title
          id="title"
          use="h3"
          fontSize="1.1rem"
          fontWeight="500"
          textTransform="capitalize"
        >
          {name}
        </Card.Title>
      </Card.Header>
      <Card.Content
        id="description"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <ImgWithFallback
          src={linkImage}
          alt={name}
          isSinglePage={isSinglePage}
        />
        {description && (
          <Paragraph whiteSpace="pre-line">{description}</Paragraph>
        )}
      </Card.Content>

      <Card.Footer
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        flexWrap="wrap"
        marginTop="3rem"
      >
        {isSinglePage ? (
          <>
            <Link
              style={{ margin: "0 0.5rem 1rem", textAlign: "center" }}
              to={`/certificaciones`}
            >
              Certificado
            </Link>
            {attachmentPath && (
              <a
                href={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/adjuntos/${attachmentPath}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 0.5rem 1rem", textAlign: "center" }}
              >
                Descargar ficha técnica
              </a>
            )}
          </>
        ) : (
          <Link
            style={{ margin: "0 0.5rem 1rem", textAlign: "center" }}
            to={`/producto/${productId}`}
          >
            ver producto
          </Link>
        )}
        <Button
          onClick={() =>
            addCartItem({
              productId,
              productName: name,
              productImage: linkImage,
              quantity: 1,
            })
          }
        >
          Añadir a cotización
        </Button>
      </Card.Footer>
    </Card>
  );
};
