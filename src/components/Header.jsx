import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [showSearchBar, setShowSearchBar] = useState(false);

  const searchBar = () => {
    if (!showSearchBar) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  const titleSearchBar = () => {
    switch (history.location.pathname) {
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
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
          alt="profile"
          src={ profileIcon }
        />
      </Link>
      <div>
        { titleSearchBar() }
      </div>
      { (pathname === '/foods' || pathname === '/drinks')
        && (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ searchBar }
            src={ searchIcon }
          >
            {/* <img  alt="search" />
            {' '} */}
          </button>)}
      { showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
