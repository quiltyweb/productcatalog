import React from "react";
import { Heading, Paragraph, styled } from "bumbag";
import { CartTable } from "../../components/CartTable/CartTable";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const SendQuoteLink = styled((props) => <Link {...props} />)`
  display: block;
  color: #000;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0;
  transition: color 0.2s;
  text-decoration: underline;
  border-radius: 4px;
  color: #d32f2f;
  text-align: center;
  white-space: normal;
  padding: 1rem 0;
  &:hover {
    color: #ff0000;
    text-decoration: underline;
  }
  @media (min-width: 425px) {
    padding: 1rem;
    text-align: right;
    white-space: nowrap;
  }
`;

export const CartPage = (): JSX.Element => {
  const { cart } = useHomePageContext();

  if (cart && !cart.length) {
    return (
      <PageWrapper title="Comercial Gattoni seguridad industrial - Mi Cotización">
        <>
          <Heading use="h2" fontSize="400" paddingBottom="1rem">
            Mi Cotización:
          </Heading>
          <Paragraph>No hay Productos en la Cotización.</Paragraph>
          <Paragraph>
            <Link
              style={{ textDecoration: "underline" }}
              to="/categoria/Q2F0ZWdvcnk6Nw=="
            >
              Click aqui para empezar a agregar productos a su cotización.
            </Link>
          </Paragraph>
        </>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Comercial Gattoni seguridad industrial - Mi Cotización">
      <>
        <Heading use="h2" fontSize="400" paddingBottom="1rem">
          Mi Cotización:
        </Heading>
        {cart && cart.length > 5 && (
          <SendQuoteLink to="/enviar-cotizacion">
            Siguiente paso: Ingrese sus datos
          </SendQuoteLink>
        )}
        <CartTable />
        <SendQuoteLink to="/enviar-cotizacion">
          Siguiente paso: Ingrese sus datos
        </SendQuoteLink>
      </>
    </PageWrapper>
  );
};
export default CartPage;
