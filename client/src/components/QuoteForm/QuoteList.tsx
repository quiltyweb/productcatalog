import React from 'react'
import {
  Box,
  Heading,
  Table
} from 'fannypack'
 
const QuoteForm = () => {
  return (
    <Box padding="major-2">
      <Heading use="h2">Productos a cotizar:</Heading>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Nombre producto</Table.HeadCell>
            <Table.HeadCell textAlign="right">Cantidad</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Protector oido adosable a casco black bull</Table.Cell>
            <Table.Cell textAlign="right">3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Stainless steel eye-facewash</Table.Cell>
            <Table.Cell textAlign="right">4</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mascarilla</Table.Cell>
            <Table.Cell textAlign="right">15</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  )
}

export default QuoteForm
