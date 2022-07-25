export default async function apiRecipeDetails(id, pathname) {
  if (pathname === `/foods/${id}`) {
    const receita = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(receita);
    const { meals } = await response.json();
    return meals[0];
  } if (pathname === `/drinks/${id}`) {
    const receita = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(receita);
    const { drinks } = await response.json();
    return drinks[0];
  }
}
