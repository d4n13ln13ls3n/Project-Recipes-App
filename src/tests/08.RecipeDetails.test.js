import App from '../App';
import { cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

async function waitForApiResponse() {
  const loadingElement = await screen
    .findByTestId("loading-image", undefined)
    .catch(() => null);

  if (!loadingElement) {
    return;
  }

  return waitForElementToBeRemoved(() => screen.queryByTestId("loading-image"));
}

describe('Testa a página Recipe Details', () => {
  test('1. Se a página exibe o vídeo e as recomendações para Big Mac', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/foods');

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
  });

  test('2. Se a página exibe o vídeo e as recomendações para Avalanche', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const shakeButton = await screen.findByText(/shake/i);
    expect(shakeButton).toBeInTheDocument();

    userEvent.click(shakeButton);

    const avalanche = await screen.findByText(/avalanche/i);
    expect(avalanche).toBeInTheDocument();

    userEvent.click(avalanche);

    const recommendation = await screen.findByTestId('0-recomendation-title');
    expect(recommendation).toBeInTheDocument();

    const recommendationLinks = await screen.findAllByRole('link');
    expect(recommendationLinks).toHaveLength(6);
  });

});