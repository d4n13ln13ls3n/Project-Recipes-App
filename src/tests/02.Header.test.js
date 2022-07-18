import Header from '../components/Header';
import App from '../App';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Header', () => {
  test('1. Se o ícone de perfil aparece na tela e redireciona para a página profile', () => {
    const { history } = renderWithRouter(<Header />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  test('2. Se o ícone de perfil aparece na tela', () => { //  testar posteriormente se renderiza a barra de busca
    const { history } = renderWithRouter(<Header />);
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
  });
  test('3. Se os títulos aparecem de forma correta', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    
    const h1Foods = await screen.findByText(/foods/i);
    expect(h1Foods).toBeInTheDocument();

    history.push('/drinks');

    const h1Drinks = await screen.findByText(/drinks/i);
    expect(h1Drinks).toBeInTheDocument();
  });
  // test('4. Se o ícone de busca aparece somente nos locais corretos', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   const searchIcon = await screen.findByTestId('search-top-btn');

  //   history.push('/profile');
  //   expect(searchIcon).not.toBeInTheDocument();

  //   history.push('/done-recipes');
  //   expect(searchIcon).not.toBeInTheDocument();

  //   history.push('/favorite-recipes');
  //   expect(searchIcon).not.toBeInTheDocument();
  // });
});