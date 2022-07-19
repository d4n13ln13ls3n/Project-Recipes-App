import Header from '../components/Header';
import App from '../App';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa o componente SearchBar', () => {
  test('1. Testa se os radio buttons, o text input e o botão de busca aparecem na tela', async () => {
    renderWithRouter(<Header />);
    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);

    const textSearchInput = await screen.findByTestId('search-input');
    const searchButton = await screen.findByTestId('exec-search-btn');
    
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const nameRadio = await screen.findByTestId('name-search-radio');
    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
})