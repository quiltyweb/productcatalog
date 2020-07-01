import React from 'react';
import styled from "styled-components";

const CardItem = styled.li`
  cursor: pointer;
  border: 1px solid #666;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.div`
  height: 10.5rem;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;

const CardCta = styled.a`
  padding: 0.75rem;
  border: 1px solid;
  border-radius: 0.25rem;
  text-align: center;

  &:focus {
    outline: 2px solid #D32F2F;
  }
`;

const HeadingCard = styled.h3`
  font-size: 1.2rem;
  line-height: normal;
`;

type CardProps = {
  name: string;
  description: string;
  linkImage: string
};

const Card: React.FunctionComponent<CardProps> = ({ name, description, linkImage }): JSX.Element => {
  return (
    <CardItem>
      <CardImage><img src={linkImage} alt="" /></CardImage>
      <CardContent>
        <HeadingCard>{name}</HeadingCard>
        <p>{description}</p>
        <CardCta href="http://www.gattoni.cl" aria-label={`Cotizar ${name}`}>Cotizar →</CardCta>
      </CardContent>
    </CardItem>
  )
}

export default Card;