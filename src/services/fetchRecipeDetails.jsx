export default async function fetchRecipeDetails(id, pathname) {
  if (pathname === `/foods/${id}`) {
    const recipe = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(recipe);
    const { meals } = await response.json();
    return meals[0];
  }
  const recipe = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(recipe);
  const { drinks } = await response.json();
  return drinks[0];
}
