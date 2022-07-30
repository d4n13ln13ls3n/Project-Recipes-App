import App from '../App';
import { cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

async function waitForApiResponse() {
  const loadingElement = await screen
    .findByText(/Loading.../i, undefined)
    .catch(() => null);

  if (!loadingElement) {
    return;
  }

  return waitForElementToBeRemoved(() => screen.findByText(/Loading.../i));
}

describe('Testa a página Recipe Details', () => {
  afterEach(cleanup);
  
   test('5. Se a página de Big Mac exibe um máximo de 6 recomendações', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/53013');

    const recommendationLinks = await screen.findAllByRole('link');
    expect(recommendationLinks).toHaveLength(6);
  });
  
  test('1. Se a página exibe o vídeo e as recomendações para Big Mac', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/foods');

    await waitForApiResponse();

    // const beefButton = await screen.findByRole('button', { name: /beef/i });
    const beefButton = await screen.findByText(/beef/i);
    expect(beefButton).toBeInTheDocument();

    userEvent.click(beefButton);

    const bigMac = await screen.findByText(/big mac/i);
    expect(bigMac).toBeInTheDocument();

    userEvent.click(bigMac);

    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();

    const recommendation = await screen.findByTestId('0-recomendation-title');
    expect(recommendation).toBeInTheDocument();

    const recommendationLinks = await screen.findAllByRole('link');
    expect(recommendationLinks).toHaveLength(6);

    expect(history.location.pathname).toBe('/foods/53013');
  });

  test('2. Se a página exibe o vídeo e as recomendações para Avalanche', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitForApiResponse();
    
    const shakeButton = await screen.findByText(/shake/i);
    expect(shakeButton).toBeInTheDocument();

    userEvent.click(shakeButton);

    const avalanche = await screen.findByText(/avalanche/i);
    expect(avalanche).toBeInTheDocument();

    userEvent.click(avalanche);

    expect(history.location.pathname).toBe('/drinks/16419');

    const recommendation = await screen.findByTestId('0-recomendation-title');
    expect(recommendation).toBeInTheDocument();

    const recommendationLinks = await screen.findAllByRole('link');
    expect(recommendationLinks).toHaveLength(6);
  });

  test('3. Na página DRINKS, se ao clicar em START RECIPE o usuário é direcionado para a página IN-PROGRESS', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitForApiResponse();

    const adam = await screen.findByText(/Adam/i);
    userEvent.click(adam);

    const startRecipeButton = await screen.findByRole('button', { name: /start recipe/i});
    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    const finishRecipeButton = await screen.findByRole('button', { name: /finish recipe/i});
    expect(finishRecipeButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/17837/in-progress');
  });

  test('4. Na página FOODS, se ao clicar em START RECIPE o usuário é direcionado para a página IN-PROGRESS', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitForApiResponse();

    const wontons = await screen.findByText(/Wontons/i);
    userEvent.click(wontons);

    const startRecipeButton = await screen.findByRole('button', { name: /start recipe/i});
    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    const finishRecipeButton = await screen.findByRole('button', { name: /finish recipe/i});
    expect(finishRecipeButton).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods/52948/in-progress');
  });

 

});