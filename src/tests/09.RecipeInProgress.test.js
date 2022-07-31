import App from '../App';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa a página Recipe In Progress', () => {
  test('1. Os elementos da página de Receitas em progresso', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/foods');

    debug();
    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();
    
    userEvent.click(corbaRecipe);
    
    const corba = await screen.findByText(/corba/i);
    expect(corba).toBeInTheDocument();
    
    const startOrContinueBtn = await screen.findByTestId('start-recipe-btn')
    userEvent.click(startOrContinueBtn) 
    
    const corbaCategory = await screen.findByText(/side/i)
    expect(corbaRecipe).toBeInTheDocument()
    expect(corbaCategory).toBeInTheDocument()
  });

});