import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
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
        && <img
          data-testid="search-top-btn"
          alt="search"
          src={ searchIcon }
        />}
    </header>
  );
}

export default Header;
