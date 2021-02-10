import React from "react";
import { Column, Columns, styled, Heading, Paragraph, Box } from "bumbag";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { useHomePageContext } from "../HomePage/HomePageContext";
import { CartTable } from "../../components/CartTable/CartTable";

import PageWrapper from "../../components/PageWrapper/PageWrapper";

const QuoteSummaryBox = styled(Box)`
  background-color: #fff;
`;

const FormBox = styled(Box)`
  background-color: #eeeeee;
  border-radius: 5px;
`;

export const QuotePage = (): JSX.Element => {
  const { cart } = useHomePageContext();
  if (cart && !cart.length) {
    return (
      <PageWrapper title="Comercial Gattoni seguridad industrial - Formulario de Cotización">
        <>
          <Heading>Mi Cotización:</Heading>
          <Paragraph>No hay Productos en la Cotización.</Paragraph>
          <Paragraph>
            Agregue articulos a su cotización navegando a través del menú de
            categorias
          </Paragraph>
        </>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Comercial Gattoni seguridad industrial - Formulario de Cotización">
      <>
        <Heading use="h2" fontSize="400" paddingBottom="1rem">
          Ingrese datos de su cotización
        </Heading>
        <Columns>
          <Column>
            <QuoteSummaryBox>
              <CartTable isEditable={false} />
            </QuoteSummaryBox>
          </Column>
          <Column>
            <FormBox>
              <QuoteForm
                cartItems={cart}
                initialValues={{
                  nombreCompleto: "",
                  email: "",
                  mensaje: "",
                  telefono: "",
                  recaptcha: "",
                }}
              />
            </FormBox>
          </Column>
        </Columns>
      </>
    </PageWrapper>
  );
};
export default QuotePage;
