import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
// import Login from './pages/Login';
// import { waitFor } from "@testing-library/react";
// import { useLocation } from 'react-router-dom';

describe('Testa o componente Login e suas funcionalidades', () => {

  it('Verifica se o botão ENTER está funcionando corretamente', async () => {
  const { history } = renderWithRouter(<App />)
  const emailInput = screen.getByTestId('email-input')
  expect(emailInput).toBeInTheDocument()
  
  // waitFor(() => expect(emailInput).toBeInTheDocument()); 
  
  const passwordInput = screen.getByTestId('password-input')
  expect(passwordInput).toBeInTheDocument()
   
  userEvent.type(emailInput, 'email@email.com' )
  userEvent.type(passwordInput, '1234567' )
  // history.push('/foods')
  const loginButton = screen.getByTestId('login-submit-btn')
  expect(loginButton).toBeInTheDocument()
  userEvent.click(loginButton)
  await screen.findByText(/Teste Foods/i)
  const { pathname } = history.location;


  console.log(loginButton)

  expect(pathname).toBe('/foods')
  


  // expect(screen.getByText(/teste Foods/i)).toBeInTheDocument()

  // const {pathname} = useLocation(); 
  // expect(pathname).toBe('/foods')

  })

});
