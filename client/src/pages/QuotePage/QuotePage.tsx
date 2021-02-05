import React from "react";
import {
  Column,
  Columns,
  styled,
  Heading,
  Paragraph,
  Box,
  PageContent,
} from "bumbag";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { useHomePageContext } from "../HomePage/HomePageContext";
import { CartTable } from "../../components/CartTable/CartTable";

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
      <PageContent breakpoint="desktop">
        <Heading>Mi Cotización:</Heading>
        <Paragraph>No hay Productos en la Cotización.</Paragraph>
        <Paragraph>
          Agregue articulos a su cotización navegando a través del menú de
          categorias
        </Paragraph>
      </PageContent>
    );
  }

  return (
    <PageContent breakpoint="desktop">
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
            <QuoteForm cartItems={cart} />
          </FormBox>
        </Column>
      </Columns>
    </PageContent>
  );
};
export default QuotePage;
