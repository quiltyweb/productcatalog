import React from "react";
import { styled, Card as FPCard, Image, Button } from "fannypack";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { Link } from "react-router-dom";

const CardItem = styled(FPCard.Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ImageStyled = styled(Image)`
  max-width: 100%;
  max-height: 250px;
  margin-right: 0.5rem;

  @media (min-width: 1020px) {
    max-width: 180px;
  }
`;

const SingleImageStyled = styled(Image)`
  max-width: 100%;
  max-height: 300px;
  margin-right: 0.5rem;
`;

const CardCta = styled(Button)`
  padding: 0;
  margin: 0.3rem;
  border: 1px solid;
  border-radius: 0.25rem;
  text-align: center;
  width: 100%;
  font-size: 0.8rem;

  &:focus {
    outline: 2px solid #d32f2f;
  }
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
          {isSinglePage ? (
            <SingleImageStyled fit="cover" src={linkImage} />
          ) : (
            <ImageStyled fit="cover" src={linkImage} />
          )}
        </Link>
        {description && <p>{description}</p>}
      </FPCard.Content>

      <FPCard.Footer justifyContent="flex-end">
        {hasPrintCTA && (
          <CardCta
            onClick={() => {
              console.log("imprimir");
            }}
            aria-label={`imprimir ${name}`}
          >
            imprimir →
          </CardCta>
        )}
        {attachmentPath && (
          <CardCta
            onClick={() => {
              console.log("imprimir");
            }}
            aria-label={`imprimir ${name}`}
          >
            Descargar PDF →
          </CardCta>
        )}
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
