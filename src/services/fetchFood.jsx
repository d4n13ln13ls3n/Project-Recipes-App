export default async function fetchFood(foodSelected) {
  // console.log('food selected:', foodSelected);
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodSelected}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
}
