import React from 'react'
import {
  Box,
  Heading
} from 'fannypack'
import { useParams } from 'react-router-dom';

 
const QuoteForm = () => {
  const { categoryId } = useParams();
 
  return (
    <Box padding="major-2">
      <Heading use="h2">Categoria: {categoryId}</Heading>
      
    </Box>
  )
}

export default QuoteForm
