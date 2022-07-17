import React, { useContext } from 'react';
import recipesAppContext from '../context/RecipesAppContext';

// aqui é aonde vai ficar os filtros (que vai ser o header no caso)

export default function Filters() {
  const {
    filters: { recipesLimit },
    setFilters,
  } = useContext(recipesAppContext);

  // esse input é temporário, só serve para eu testar se o filtro está funcionando, logo
  // vai ser substituido pelo header

  function changeFilters({ target }) {
    setFilters((prevState) => (
      { ...prevState, recipesLimit: target.value }
    ));
  }

  return (
    <input
      type="number"
      value={ recipesLimit }
      onChange={ changeFilters }
    />
  );
}
