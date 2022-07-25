import Header from '../components/Header';
import App from '../App';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Header', () => {
  test('1. Se o ícone de perfil aparece na tela e redireciona para a página profile', async () => {
    const { history } = renderWithRouter(<Header />);
    const profileIcon = await screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  test('2. Se o ícone(botão) de busca aparece na tela', () => { //  testar posteriormente se renderiza a barra de busca
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods')

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();

    history.push('/drinks')

    const searchIcon2 = screen.getByTestId('search-top-btn');
    expect(searchIcon2).toBeInTheDocument();
  });

  test.only('3. Se os títulos aparecem de forma correta', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    
    const h1Foods = await screen.findByText(/foods/i);
    expect(h1Foods).toBeInTheDocument();

    history.push('/drinks');

    const h1Drinks = await screen.findByText(/drinks/i);
    expect(h1Drinks).toBeInTheDocument();

    history.push('/profile');

    const h1Profile = await screen.findByRole('heading', { level: 1});
    expect(h1Profile).toBeInTheDocument();

    history.push('/done-recipes');

    const h1DoneRecipes = await screen.findByText(/done/i);
    expect(h1DoneRecipes).toBeInTheDocument();

    history.push('/favorite-recipes');

    const h1FavoriteRecipes = await screen.findByText(/favorite/i);
    expect(h1FavoriteRecipes).toBeInTheDocument();

    history.push('/xablau');

    const h1FavoriteRecipes2 = await screen.findByText(/favorite/i);
    expect(h1FavoriteRecipes2).not.toBeInTheDocument();
  });
  
   test('4. Se o ícone de busca aparece somente nos locais corretos', async () => {
     const { history } = renderWithRouter(<App />);

     history.push('/foods');
     const searchIcon1 = await screen.findByTestId('search-top-btn');
     expect(searchIcon1).toBeInTheDocument()

     history.push('/drinks');
     const searchIcon2 = await screen.findByTestId('search-top-btn');
     expect(searchIcon2).toBeInTheDocument()

   });

  test('5. Se a barra de busca aparece e/ou desaparece ao clicar no botão', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods')

    const button = await screen.findByTestId('search-top-btn')
    expect(button).toBeInTheDocument();

    userEvent.click(button)
    const searchInput = await screen.findByTestId('search-input')
    expect(searchInput).toBeInTheDocument();

    userEvent.click(button)
    expect(searchInput).not.toBeInTheDocument();
  });

  

});