import App from '../App';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa a página Recipe Details', () => {
  test('1. Se a página exibe o vídeo e as recomendações para Big Mac', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/foods');