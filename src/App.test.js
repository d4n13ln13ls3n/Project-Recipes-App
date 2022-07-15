import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Testa o componente Login e suas funcionalidades', () => {
  render(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
