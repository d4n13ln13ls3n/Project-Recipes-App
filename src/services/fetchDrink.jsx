export default async function fetchDrink(drinkSelected) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSelected}`;
  const response = await fetch(endpoint);
  const { drinks } = await response.json();
  return drinks;
}
