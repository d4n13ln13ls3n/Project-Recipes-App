import App from '../App';
import { cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

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

function waitForApiResponse() {
  return waitForElementToBeRemoved(() => screen.queryByTestId("loading-image"));
}  

  describe('Testa a página Recipes', () => {
    afterEach(cleanup);

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
    // const ordinaryButton = await screen.findByText('Ordinary Drink');
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
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const beefButton = await screen.findByRole('button', { name: /beef/i });
    // const beefButton = await screen.findByText('Beef');
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);

    await waitForApiResponse();

    const bigMac = await screen.findByText(/big mac/i);
    expect(bigMac).toBeInTheDocument();

    const headings = await screen.findAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(12);
  });

  test('4. Se ao clicar no card BIGMAC, a página é redirecionada para os detalhes daquele card', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    const beefButton = await screen.findByText(/beef/i);
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);

    await waitForApiResponse();

    const bigMac = await screen.findByText(/big mac/i);
    expect(bigMac).toBeInTheDocument();

    userEvent.click(bigMac);

    expect(history.location.pathname).toBe('/foods/53013');

    const olive = await screen.findByText(/olive/i);
    expect(olive).toBeInTheDocument();
  });

});