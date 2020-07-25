import React, { useState } from "react";
import { styled, Card as FPCard, Image, Button, Paragraph } from "fannypack";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { Link } from "react-router-dom";

const CardItem = styled(FPCard.Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.7rem;
`;

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

const CardCta = styled(Button)`
  padding: 0;
  margin: 0;
  border: 1px solid;
  border-radius: 0.25rem;
  text-align: center;
  width: 100%;
  font-size: 0.8rem;

  &:focus {
    outline: 2px solid #d32f2f;
  }
`;

const ParagraphStyled = styled(Paragraph)`
  white-space: pre-line;
`;

interface CardProps {
  productId: string;
  name: string;
  description?: string;
  linkImage: string;
  attachmentPath?: string;
  hasPrintCTA?: boolean;
  isSinglePage?: boolean;
}

const ImgWithFallback: React.FunctionComponent<{
  src: string;
  alt: string;
  isSinglePage?: boolean;
}> = ({ src, alt, isSinglePage }) => {
  const [isUndefined, updateIsUndefined] = useState(false);

  const onError = () => {
    updateIsUndefined(true);
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

  return isSinglePage ? (
    <SingleImageStyled src={src} alt={alt} title={alt} onError={onError} />
  ) : (
    <ImageStyled src={src} alt={alt} title={alt} onError={onError} />
  );
};

const Card: React.FunctionComponent<CardProps> = ({
  productId,
  name,
  description,
  linkImage,
  attachmentPath,
  hasPrintCTA,
  isSinglePage,
}): JSX.Element => {
  const { addCartItem } = useHomePageContext();
  return (
    <CardItem a11yDescriptionId="description" a11yTitleId="title">
      <FPCard.Header>
        <FPCard.Title id="title" use="h3">
          {name}
        </FPCard.Title>
      </FPCard.Header>
      <FPCard.Content
        id="description"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={`/producto/${productId}`}>
          <ImgWithFallback
            src={linkImage}
            alt={name}
            isSinglePage={isSinglePage}
          />
        </Link>
        {description && <ParagraphStyled>{description}</ParagraphStyled>}
      </FPCard.Content>

      <FPCard.Footer justifyContent="flex-end">
        {/* TODO: Add print and pdf later when functionality is ready */}
        {/* {hasPrintCTA && (
          <CardCta
            onClick={() => {
              console.log("imprimir");
            }}
            aria-label={`imprimir ${name}`}
          >
            imprimir →
          </CardCta>
        )} */}
        {/* {attachmentPath && (
          <CardCta
            onClick={() => {
              console.log("imprimir");
            }}
            aria-label={`imprimir ${name}`}
          >
            Descargar PDF →
          </CardCta>
        )} */}
        <CardCta
          onClick={() =>
            addCartItem({
              productId,
              productName: name,
              productImage: linkImage,
              quantity: 1,
            })
          }
          aria-label={`Cotizar ${name}`}
        >
          Cotizar →
        </CardCta>
      </FPCard.Footer>
    </CardItem>
  );
};

export default Card;
