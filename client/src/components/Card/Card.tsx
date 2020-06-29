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
const CardCtaSpan = styled.span`
  padding: 0.75rem;
  border: 1px solid;
  border-radius: 0.25rem;
  text-align: center;
`;

const CardLink = styled.a`
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

const HeadingCard = styled.h2`
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
        <HeadingCard><CardLink href="http://www.gattoni.cl" aria-describedby="desc-a-card">{name}</CardLink></HeadingCard>
        <p>{description}</p>
        <CardCtaSpan id="desc-a-card">Cotizar →</CardCtaSpan>
      </CardContent>
    </CardItem>
  )
}

export default Card;