import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders learn react link', async () => {
  render(<Home />);
  const headinElemn = await screen.findByRole('heading');
  expect(headinElemn).toHaveTextContent('Bienvenidos')

});
