import Header from '../components/Header';
import App from '../App';
import { screen, waitFor, cleanup } from '@testing-library/react';
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

afterEach(cleanup);

describe('Testa o componente SearchBar', () => {
  test('1. Testa se os radio buttons, o text input e o botão de busca aparecem na tela de foods', async () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    expect(showSearchBarButton).toBeInTheDocument()
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

  test('4. Testa os Radio Buttons ', async () => {
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

  test('5. Verifica se os filtros estão funcionando corretamente na página foods', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    // global.fetch = async () => ({
    //   json: async () => (apiResponseMock),
    // });

    const { history } = renderWithRouter(<App />);
    
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
    userEvent.type(textSearchInput, 'big mac');
    userEvent.click(searchButton);
    
    // const { pathname } = history.location;
    //   await waitFor(() => { expect(pathname).toBe('/foods/53013')
    // })

    userEvent.click(firstLetterRadio);
    userEvent.type(textSearchInput, 'chicken');
    userEvent.click(searchButton);


    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
    });

  });

  test('6. Verifica se os filtros estão funcionando corretamente na página drinks', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);
    
    history.push('/drinks')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    const nameRadio = await screen.findByTestId('name-search-radio')
    const textSearchInput = await screen.findByTestId('search-input');

    userEvent.click(nameRadio);
    userEvent.type(textSearchInput, 'Apple Karate');
    userEvent.click(searchButton);
    
    // const { pathname } = history.location;
    //   await waitFor(() => { expect(pathname).toBe('/drinks/12564')
    // });
    const { pathname } = history.location;
      await waitFor(() => { expect(pathname).toBe('/drinks/12564')
    })

const ingredientRadio = await screen.findByTestId('ingredient-search-radio')
    userEvent.click(ingredientRadio);
    userEvent.type(textSearchInput, 'apple');
    userEvent.click(searchButton);

    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio')
    userEvent.click(firstLetterRadio);
    userEvent.type(textSearchInput, 'aaaa');

userEvent.click(searchButton);

        await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
    });

  });

  test('7. Se o usuário é redirecionado para a página de detalhes de um prato ao fazer uma busca que retorne somente um resultado', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods')

    const button = await screen.findByTestId('search-top-btn')
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Big Mac');

    const nameRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameRadio);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const testingDetails = await screen.findByText(/testing recipe details/i);
    expect(testingDetails).toBeInTheDocument();
    // expect(history.location.pathname).toBe('/foods/53013');
  });

  test('8. Se aparecem de 2 a 12 cards na tela após fazer uma busca de comida ou bebida por ingrediente', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods')

    const button = await screen.findByTestId('search-top-btn')
    userEvent.click(button);
    const searchInput = await screen.findByTestId('search-input');
    
    userEvent.type(searchInput, /onion/i);

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    userEvent.click(searchButton);

    const images = await screen.findAllByRole('heading', { level: 3 });
    expect(images).toHaveLength(12);
    
    const bigMac = await screen.findByText(/big mac/i);
    expect(bigMac).toBeInTheDocument();

    
  });

  test('9. Se aparecem de 2 a 12 cards na tela após fazer uma busca de comida ou bebida por primeira letra', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods')

    const button = await screen.findByTestId('search-top-btn')
    userEvent.click(button);
    const searchInput = await screen.findByTestId('search-input');
    
    userEvent.type(searchInput, 'a');

    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    userEvent.click(searchButton);

    const recipeContainer = await screen.findByText(/recipe container/i);
    expect(recipeContainer).toBeInTheDocument();
    
    // const headings = await screen.findAllByRole('heading', { level: 3 });
    // expect(headings).toHaveLength(4);
    
    // const apamBalik = await screen.findByText(/Apam balik/i);
    // expect(apamBalik).toBeInTheDocument();

    
  });

  test('10. Verifica se o campo first letter retorna um erro após ser feita uma pesquisa com mais de um caractere', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);
    
    history.push('/foods')

    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio')
    const textSearchInput = await screen.findByTestId('search-input');

    userEvent.click(firstLetterRadio);
    userEvent.type(textSearchInput, 'aaa');
    userEvent.click(searchButton);
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
    });

  });

  test('11. Testa chamadas da API para busca pelo nome', async () => {
    const fetch = jest.spyOn(global, 'fetch')

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const showSearchBarButton = await screen.findByTestId('search-top-btn');
    userEvent.click(showSearchBarButton);
    
    const searchButton = await screen.findByTestId('exec-search-btn');
    const nameRadio = await screen.findByTestId('name-search-radio')
    const textSearchInput = await screen.findByTestId('search-input');

    userEvent.click(nameRadio);
    userEvent.type(textSearchInput, 'Apple Karate');
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Apple Karate')

  });

  // test('12. Testa chamadas da API para busca pelo ingrediente', async () => {
  //   const fetch = jest.spyOn(global, 'fetch');

  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
    userEvent.click(searchButton);

        await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
    })

  });

  // test('7. Testa chamadas da API para busca pelo nome', async () => {
  //   const fetch = jest.spyOn(global, 'fetch')

  //   const showSearchBarButton = await screen.findByTestId('search-top-btn');
  //   userEvent.click(showSearchBarButton);
    
  //   const searchButton = await screen.findByTestId('exec-search-btn');
  //   const nameRadio = await screen.findByTestId('name-search-radio')
  //   const textSearchInput = await screen.findByTestId('search-input');

  //   userEvent.click(nameRadio);
  //   userEvent.type(textSearchInput, 'Apple Karate');
  //   userEvent.click(searchButton);

  //   expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Apple Karate')

  // })

  // test('8. Testa chamadas da API para busca pelo ingrediente', async () => {
  //   const fetch = jest.spyOn(global, 'fetch')

  //   const showSearchBarButton = await screen.findByTestId('search-top-btn');
  //   userEvent.click(showSearchBarButton);

  //   const searchButton = await screen.findByTestId('exec-search-btn');
  //   const ingredientRadio = await screen.findByTestId('ingredient-search-radio')
  //   const textSearchInput = await screen.findByTestId('search-input');
    
  //   userEvent.click(ingredientRadio);

  //   userEvent.type(textSearchInput, /apple/i );
  //   userEvent.click(searchButton);

  //   expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=apple')

  // });
  
  // test('11. Testa chamadas da API para busca pela primeira letra', async () => {
  //   const fetch = jest.spyOn(global, 'fetch')

  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const showSearchBarButton = await screen.findByTestId('search-top-btn');
  //   userEvent.click(showSearchBarButton);
    
  //   const searchButton = await screen.findByTestId('exec-search-btn');
  //   const firstLetterRadio = await screen.findByTestId('first-letter-search-radio')
  //   const textSearchInput = await screen.findByTestId('search-input');

  //   userEvent.click(firstLetterRadio);
  //   userEvent.type(textSearchInput, 'a');
  //   userEvent.click(searchButton);
  //   const endpoint3 = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

  //   expect(fetch).toHaveBeenCalledWith(endpoint3);

  // });


  //   userEvent.type(textSearchInput, 'apple');
  //   userEvent.click(searchButton);

  //   expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=apple')

  // })

});
