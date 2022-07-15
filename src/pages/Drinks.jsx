import React, { useContext } from 'react';
import recipesAppContext from '../hooks/RecipesAppContext';
import '../css/Recipes.css';

export default function Drinks() {
  const { drinks } = useContext(recipesAppContext);

  return (
    <section className="drinkContainer">
      {
        drinks && (
          drinks.map((drink, index) => (
            <div
              key={ drink.strDrink }
              data-testid={ `${index}-recipe-card` }
              className="drinkCard"
            >
              <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
                className="drinkImage"
              />
            </div>
          ))
        )
      }
    </section>
  );
}
