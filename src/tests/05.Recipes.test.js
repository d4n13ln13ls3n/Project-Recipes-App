import Header from '../components/Header';
import App from '../App';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe.only('Testa a página Recipes', () => {
  test('1. Se os botões com as cinco categorias de comidas aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/recipes');

    const beefButton = screen.findByRole('button', { name: /beef/i });
    expect(beefButton).toBeInTheDocument();

    const breakfastButton = screen.findByRole('button', { name: /breakfast/i });
    expect(breakfastButton).toBeInTheDocument();

    const chickenButton = screen.findByRole('button', { name: /chicken/i });
    expect(chickenButton).toBeInTheDocument();

    const dessertButton = screen.findByRole('button', { name: /dessert/i });
    expect(dessertButton).toBeInTheDocument();

    const goatButton = screen.findByRole('button', { name: /goat/i });
    expect(goatButton).toBeInTheDocument();
  });

  test('2. Se os botões com as cinco categorias de bebidas aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/recipes');

    const ordinaryButton = screen.findByRole('button', { name: /Ordinary Drink/i });
    expect(ordinaryButton).toBeInTheDocument();

    const cocktailButton = screen.findByRole('button', { name: /Cocktail/i });
    expect(cocktailButton).toBeInTheDocument();

    const shakeButton = screen.findByRole('button', { name: /Shake/i });
    expect(shakeButton).toBeInTheDocument();

    const unknownButton = screen.findByRole('button', { name: /Other/i });
    expect(dessertButton).toBeInTheDocument();

    const cocoaButton = screen.findByRole('button', { name: /Cocoa/i });
    expect(cocoaButton).toBeInTheDocument();
  });  
});