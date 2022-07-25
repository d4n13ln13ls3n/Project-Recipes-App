import { fetchJSON } from './fetch';

async function search(searchText) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
  const { data } = await fetchJSON(endpoint);

  return data.drinks || [];
}

async function filterByIngredient(ingredient) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { data } = await fetchJSON(endpoint);

  return data.drinks || [];
}

const drinkService = {
  search,
  filterByIngredient,
};

export default drinkService;
