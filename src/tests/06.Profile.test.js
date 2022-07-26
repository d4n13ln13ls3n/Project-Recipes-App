import App from '../App';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';

  // beforeEach(() => {
  //   Object.defineProperty(window, "localStorage", {
  //     value: {
  //       removeItem: jest.fn(() => null),
  //     },
  //   });
  // });

describe('Testa a página de perfil', () => {
  test('3. Se o botão Logout funciona', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    Object.defineProperty(global, "localStorage", {
      value: {
        removeItem: jest.fn()
      }
    });

    const logoutButton = await screen.findByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    expect(global.localStorage.removeItem).toHaveBeenCalledTimes(6);
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('mealsToken');
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('cocktailsToken');
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('doneRecipes');
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('favoriteRecipes');
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('inProgressRecipes');
   
  });

});
