import React from 'react'
import {
  Box,
  Heading,
  Columns,
  Column
} from 'fannypack'
import { useParams } from 'react-router-dom';
import Card from "../../components/Card/Card";

const QuoteForm = () => {
  const { categoryId } = useParams();
  const products = [
    {
      name: 'Lente l-300 1',
      description: 'lorem ipsum',
      image: 'http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg'
    },
    {
      name: 'Lente l-300 2',
      description: 'lorem ipsum',
      image: 'http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg'
    },
    {
      name: 'Lente l-300 3',
      description: 'lorem ipsum',
      image: 'http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg'
    },
    {
      name: 'Lente l-300 4',
      description: 'lorem ipsum',
      image: 'http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg'
    },
    {
      name: 'Lente l-300 5',
      description: 'lorem ipsum',
      image: 'http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg'
    },
    {
      name: 'Lente l-300 6',
      description: 'lorem ipsum',
      image: 'http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg'
    }
  ]
  return (
    <Box padding="major-2">
      <Heading use="h2">Categoria: {categoryId}</Heading>
      <Columns aria-labelledby="heading-destacados">
        {
          products.map(product => {
            return (
              <Column spread={3}>
                <Card
                  name={product.name}
                  description={product.description}
                  linkImage={product.image}
                />
            </Column>
            )
          })
        }
      </Columns>
    </Box>
  )
}

export default QuoteForm
