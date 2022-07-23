export default async function fetchFoodCategories() {
//   const maxCategories = 5;
  const foodsCategorysUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const getFoodCategories = await fetch(foodsCategorysUrl);
  const response = await getFoodCategories.json();
  return response;
}
