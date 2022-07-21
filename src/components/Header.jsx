import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ filteredRecipe }) {
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();

  const titleSearchBar = () => {
    const { location: { pathname } } = history;
    switch (pathname) {
    case '/foods':
      return <h1 data-testid="page-title">Foods</h1>;
    case '/drinks':
      return <h1 data-testid="page-title">Drinks</h1>;
    case '/profile':
      return <h1 data-testid="page-title">Profile</h1>;
    case '/done-recipes':
      return <h1 data-testid="page-title">Done Recipes</h1>;
    case '/favorite-recipes':
      return <h1 data-testid="page-title">Favorite Recipes</h1>;
    default:
      return null;
    }
  };

  return (
    <header>
      { titleSearchBar() }
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
        >
          <img src={ profileIcon } alt="profile" />
          Profile
        </button>
      </Link>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setIsVisible((prevState) => !prevState) }
      >
        <img src={ searchIcon } alt="search" />
        Open Search
      </button>
      { isVisible && (
        <SearchBar
          filteredRecipe={ filteredRecipe }
        />
      )}
    </header>
  );
}

// Header.propTypes = {
//   history: PropTypes
// }
