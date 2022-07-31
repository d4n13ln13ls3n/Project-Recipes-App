import React from 'react';
import Header from '../components/Header';
import FavoriteRecipeContainer from '../components/FavoriteRecipesContainer';
import recipesAppContext from '../context/RecipesAppContext';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const { favorites } = React.useContext(recipesAppContext);

  const [recipes, setRecipes] = React.useState([]);

  // recupera a lista de receitas favoritas do context
  React.useEffect(() => {
    setRecipes(favorites);
  }, [favorites]);

  const handleRadio = ({ target: { id } }) => {
    if (id === 'foods') {
      const filteredFavorites = favorites.filter((favorite) => favorite.type === 'food');
      return setRecipes(filteredFavorites);
    }
    if (id === 'drinks') {
      const filteredFavorites = favorites.filter((favorite) => favorite.type === 'drink');
      return setRecipes(filteredFavorites);
    }
    return setRecipes(favorites);
  };

  return (
    <div>
      <Header page="favoriteRecipes" />
      <div>
        <label htmlFor="all">
          <input
            name="radioFilter"
            defaultChecked
            type="radio"
            id="all"
            data-testid="filter-by-all-btn"
            onClick={ handleRadio }
          />
          All
        </label>
        <label htmlFor="foods">
          <input
            name="radioFilter"
            type="radio"
            id="foods"
            data-testid="filter-by-food-btn"
            onClick={ handleRadio }
          />
          Foods
        </label>
        <label htmlFor="drinks">
          <input
            name="radioFilter"
            type="radio"
            id="drinks"
            data-testid="filter-by-drink-btn"
            onClick={ handleRadio }
          />
          Drinks
        </label>
      </div>
      <div>
        {
          recipes.length && (
            recipes.map((recipe, index) => (
              <FavoriteRecipeContainer
                key={ recipe.id }
                recipe={ recipe }
                index={ index }
              />
            ))
          )
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
