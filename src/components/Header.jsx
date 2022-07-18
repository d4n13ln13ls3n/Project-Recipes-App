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

  return (
    <header>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          alt="profile"
          src={ profileIcon }
        />
      </Link>
      <h1
        data-testid="page-title"
      >
        { history.location.pathname === '/foods'
          ? 'Foods' : 'Drinks'}
      </h1>
      { (pathname !== '/profile'
      || pathname !== '/done-recipes'
      || pathname !== '/favorite-recipes')
        && <button
          type="button"
          data-testid="search-top-btn"
          onClick={ searchBar }
        >
          <img src={ searchIcon } alt="search" />
          {' '}
        </button>}
      { showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
