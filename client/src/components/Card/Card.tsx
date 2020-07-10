import React from 'react'
import { styled, Card as FPCard, Image, Button } from 'fannypack'
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";

const CardItem = styled(FPCard.Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const CardCta = styled(Button)`
  padding: 0.75rem;
  border: 1px solid;
  border-radius: 0.25rem;
  text-align: center;
  width: 100%;

  &:focus {
    outline: 2px solid #d32f2f;
  }
`

interface CardProps {
  productId: string
  name: string
  description: string
  linkImage: string
}

const Card: React.FunctionComponent<CardProps> = ({
  productId,
  name,
  description,
  linkImage
}): JSX.Element => {
  const { addCartItem } = useHomePageContext();


  return (
    <CardItem a11yDescriptionId="description" a11yTitleId="title">
      <FPCard.Header>
        <Image fit="cover" src={linkImage} />
        <FPCard.Title id="title" use="h3">
          {name}
        </FPCard.Title>
      </FPCard.Header>
      <FPCard.Content id="description">
        {description}
      </FPCard.Content>
      <FPCard.Footer justifyContent="flex-end">
        <CardCta onClick={() => addCartItem({ productId, quantity: 1 })} aria-label={`Cotizar ${name}`}>Cotizar →</CardCta>
      </FPCard.Footer>
    </CardItem>
  )
}

export default Card
