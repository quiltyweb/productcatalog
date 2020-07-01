import React from 'react'
import { styled, Card as FPCard, Image } from 'fannypack'

const CardItem = styled(FPCard.Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const CardCta = styled.a`
  padding: 0.75rem;
  border: 1px solid;
  border-radius: 0.25rem;
  text-align: center;
  width: 100%;

  &:focus {
    outline: 2px solid #d32f2f;
  }
`

type CardProps = {
  name: string
  description: string
  linkImage: string
}

const Card: React.FunctionComponent<CardProps> = ({
  name,
  description,
  linkImage,
}): JSX.Element => {
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
        <CardCta href="http://www.gattoni.cl" aria-label={`Cotizar ${name}`}>Cotizar →</CardCta>
      </FPCard.Footer>
    </CardItem>
  )
}

export default Card
