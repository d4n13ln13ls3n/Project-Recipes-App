import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
describe('Testa o componente Footer', () => {
    it('Deve ter os botões drink e food no footer', () => {
        renderWithRouter(<Foods />)
        const drinksFooter = screen.getByTestId('drinks-bottom-btn');
        const foodFooter = screen.getByTestId('food-bottom-btn');
        expect(foodFooter).toBeInTheDocument();
        expect(drinksFooter).toBeInTheDocument();
    })
    it('Deve redirecionar para pagina food ao clicar no botão', async () => {
        const { history } = renderWithRouter(<Foods />);
        history.push('/foods');
        const foodFooter = screen.getByTestId('food-bottom-btn');
        userEvent.click(foodFooter);
        const page = await screen.findByText('Foods');
        expect(page).toBeInTheDocument();
    })
    it('Deve redirecionar para a pagina drinks ao clicar no botão', async() => {
        const { history } = renderWithRouter(<Drinks />);
        history.push('/drinks');
        const drinksFooter = screen.getByTestId('drinks-bottom-btn');
        userEvent.click(drinksFooter);
        const page = await screen.findByText('Drinks');
        expect(page).toBeInTheDocument();
    })
})