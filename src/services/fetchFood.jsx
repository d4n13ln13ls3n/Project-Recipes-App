export default async function fetchFood(foodSelected) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodSelected}`;
  const response = await fetch(endpoint);
  const { meals } = await response.json();
  return meals;
}
