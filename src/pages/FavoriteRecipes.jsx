import React, { useContext } from 'react';
import Header from '../components/Header';
import FavoriteRecipeContainer from '../components/FavoriteRecipesContainer';
import '../css/FavoriteRecipes.css';
import recipesAppContext from '../context/RecipesAppContext';

function FavoriteRecipes() {
  const { favorites } = useContext(recipesAppContext);
  // const [recipes, setRecipes] = useState();
  // useEffect(() => {
  //   // Esse initialValue é só pra simular o favoriteRecipes salvo no local storage
  //   const initialValue = [
  //     {
  //       id: '52771',
  //       type: 'food',
  //       nationality: 'Italian',
  //       category: 'Vegetarian',
  //       alcoholicOrNot: '',
  //       name: 'Spicy Arrabiata Penne',
  //       image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     },
  //     {
  //       id: '178319',
  //       type: 'drink',
  //       nationality: '',
  //       category: 'Cocktail',
  //       alcoholicOrNot: 'Alcoholic',
  //       name: 'Aquamarine',
  //       image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     },
  //   ];
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(initialValue));

  //   setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  // }, []);
  return (
    <div>
      <Header page="favoriteRecipes" />
      <div>
        <label htmlFor="all">
          <input type="radio" id="all" data-testid="filter-by-all-btn" />
          All
        </label>
        <label htmlFor="foods">
          <input type="radio" id="foods" data-testid="filter-by-food-btn" />
          Foods
        </label>
        <label htmlFor="drinks">
          <input type="radio" id="drinks" data-testid="filter-by-drink-btn" />
          Drinks
        </label>
      </div>

      <div>
        {
          favorites && (
            favorites.map((recipe, index) => (
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
