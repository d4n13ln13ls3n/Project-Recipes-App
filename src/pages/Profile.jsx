import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import favoriteIcon from '../images/favoriteIconProfile.svg';
import doneIcon from '../images/doneIconProfile.svg';
import '../css/Profile.css';

function Profile() {
  const history = useHistory();
  // const { email } = JSON.parse(localStorage.getItem('user')); ANTES
  const { email } = JSON.parse(localStorage.getItem('user')) || { email: '' }; // DEṔOIS

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <Header page="profile" />
      <div className="profileContainer">
        <h4 data-testid="profile-email" className="profileEmail">{email}</h4>
        <div className="profileLinks">
          <Link
            to="/done-recipes"
            data-testid="profile-done-btn"
            className="profileOptions"
          >
            <img src={ doneIcon } alt="done icon" />
            Done Recipes
          </Link>
          <Link
            to="/favorite-recipes"
            data-testid="profile-favorite-btn"
            className="profileOptions"
          >
            <img src={ favoriteIcon } alt="favorite icon" />
            Favorite Recipes
          </Link>
        </div>
        <Link to="/">
          <button
            type="button"
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
            className="profileLogout"
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>);
}

export default Profile;
