import fetchJSON from './fetch';

async function search(searchText) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  const { data } = await fetchJSON(endpoint);
  return data.meals || [];
}

async function filterByIngredient(ingredient) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { data } = await fetchJSON(endpoint);
  return data.meals || [];
}

const foodService = {
  search,
  filterByIngredient,
};

export default foodService;
