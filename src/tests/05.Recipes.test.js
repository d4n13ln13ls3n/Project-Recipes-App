import App from '../App';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';

// const apiResponseMock = {
//   "meals":[
//     {"strCategory":"Beef"},
//     {"strCategory":"Breakfast"},
//     {"strCategory":"Chicken"},
//     {"strCategory":"Dessert"},
//     {"strCategory":"Goat"},
//   ],
//   "drinks":[
//     {"strCategory":"Ordinary Drink"},
//     {"strCategory":"Cocktail"},
//     {"strCategory":"Shake"},
//     {"strCategory":"Other\/Unknown"},
//     {"strCategory":"Cocoa"},
//   ],
// };

// global.fetch = () =>
//   Promise.resolve({
//     json: () => Promise.resolve(apiResponseMock),
//   });

  afterEach(cleanup);
  
  describe('Testa a página Recipes', () => {
  test('1. Se os botões com as cinco categorias de comidas aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const beefButton = await screen.findByRole('button', { name: /Beef/i } );
    expect(beefButton).toBeInTheDocument();

    const breakfastButton = await screen.findByRole('button', { name: /breakfast/i });
    expect(breakfastButton).toBeInTheDocument();

    const chickenButton = await screen.findByRole('button', { name: /chicken/i });
    expect(chickenButton).toBeInTheDocument();

    const dessertButton = await screen.findByRole('button', { name: /dessert/i });
    expect(dessertButton).toBeInTheDocument();

    const goatButton = await screen.findByRole('button', { name: /goat/i });
    expect(goatButton).toBeInTheDocument();
  });

  test('2. Se os botões com as cinco categorias de bebidas aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const ordinaryButton = await screen.findByRole('button', { name: /Ordinary Drink/i });
    expect(ordinaryButton).toBeInTheDocument();

    const cocktailButton = await screen.findByRole('button', { name: /Cocktail/i });
    expect(cocktailButton).toBeInTheDocument();

    const shakeButton = await screen.findByRole('button', { name: /Shake/i });
    expect(shakeButton).toBeInTheDocument();

    const unknownButton = await screen.findByRole('button', { name: /Other/i });
    expect(unknownButton).toBeInTheDocument();

    const cocoaButton = await screen.findByRole('button', { name: /Cocoa/i });
    expect(cocoaButton).toBeInTheDocument();
  });  
  
  test('3. Se ao clicar no botão BEEF as 12 primeiras receitas desta categoria são retornadas', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/foods');

    // const beefButton = await screen.findByRole('button', { name: /beef/i });
    debug();
    const beefButton = await screen.findByText(/beef/i);
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);

    const bigMac = await screen.findByText(/big mac/i);
    expect(bigMac).toBeInTheDocument();

    const images = await screen.findAllByRole('heading', { level: 3 });
    expect(images).toHaveLength(12);
  });

});