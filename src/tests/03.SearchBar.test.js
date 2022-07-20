import Header from '../components/Header';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';

const apiResponseMock = {
  meals: [
    {strMeal: 'Brown Stew Chicken', strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg', idMeal: '52940'},
    {strMeal: 'Chicken & mushroom Hotpot', strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg', idMeal: '52846'},
    {strMeal: 'Chicken Alfredo Primavera', strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg', idMeal: '52796'},
    {strMeal: 'Chicken Basquaise', strMealThumb: 'https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg', idMeal: '52934'},
    {strMeal: 'Chicken Congee', strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg', idMeal: '52956'},
    {strMeal: 'Chicken Handi', strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg', idMeal: '52795'},
    {strMeal: 'Kentucky Fried Chicken', strMealThumb: 'https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg', idMeal: '52813'},
    {strMeal: 'Kung Pao Chicken', strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg', idMeal: '52945'},
    {strMeal: 'Pad See Ew', strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg', idMeal: '52774'},
    {strMeal: 'Piri-piri chicken and slaw', strMealThumb: 'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg', idMeal: '53039'},
    {strMeal: 'Thai Green Curry', strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg', idMeal: '52814'},
  ]
}

// global.fetch = () =>
//   Promise.resolve({
//     json: () => Promise.resolve(apiResponseMock),
//   });

describe('Testa o componente SearchBar', () => {
  test('1. Testa se os radio buttons, o text input e o botão de busca aparecem na tela de foods', async () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);

    const textSearchInput = await screen.findByTestId('search-input');
    const searchButton = await screen.findByTestId('exec-search-btn');
    
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const nameRadio = await screen.findByTestId('name-search-radio');
    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  test('2. Testa se os radio buttons, o text input e o botão de busca aparecem na tela de drinks', async () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/drinks')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);

    const textSearchInput = await screen.findByTestId('search-input');
    const searchButton = await screen.findByTestId('exec-search-btn');
    
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const nameRadio = await screen.findByTestId('name-search-radio');
    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  test('3. Testa se o input armazena o valor', async () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);

    const textSearchInput = await screen.findByTestId('search-input');

    userEvent.type(textSearchInput, 'chicken');

    expect(textSearchInput).toHaveValue('chicken')
    
  });

  test('4. Testa os RadioButton ', async () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const nameRadio = await screen.findByTestId('name-search-radio');
    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio')

    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    
  });

  test('5. Testa  ...', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    // global.fetch = async () => ({
    //   json: async () => (apiResponseMock),
    // });

    const { history, debug } = renderWithRouter(<App />);
    
    history.push('/foods')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);

    const searchButton = await screen.findByTestId('exec-search-btn');
    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio')
    const textSearchInput = await screen.findByTestId('search-input');
    
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio')
    userEvent.click(ingredientRadio);
    userEvent.type(textSearchInput, 'apple');
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId('name-search-radio')
    userEvent.click(nameRadio);
    userEvent.type(textSearchInput, 'steak');
    userEvent.click(searchButton);

    userEvent.click(firstLetterRadio);
    userEvent.type(textSearchInput, 'chicken');
    userEvent.click(searchButton);


    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
    })

    
  });

  test('5. Testa  ...', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history, debug } = renderWithRouter(<App />);
    
    history.push('/drinks')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    const nameRadio = await screen.findByTestId('name-search-radio')
    const textSearchInput = await screen.findByTestId('search-input');

    userEvent.click(nameRadio);
    userEvent.type(textSearchInput, 'beer');
    userEvent.click(searchButton);

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio')
    userEvent.click(ingredientRadio);
    userEvent.type(textSearchInput, 'apple');
    userEvent.click(searchButton);

    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio')
    userEvent.click(firstLetterRadio);
    userEvent.type(textSearchInput, 'a');
    userEvent.click(searchButton);

  });
})