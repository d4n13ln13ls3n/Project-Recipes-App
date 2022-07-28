import React from 'react';

function DetailsIngredientContainer() {
  return (
    <div className="detailsIngredientsContainer">
      {
        recipeIngredient.map((e, i) => (
          <p
            key={ `key${i}` }
            className="detailsIngredients"
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            { `${e} - ${recipeMeasure[i]}` }
          </p>
        ))
      }
    </div>
  );
}

export default DetailsIngredientContainer;
