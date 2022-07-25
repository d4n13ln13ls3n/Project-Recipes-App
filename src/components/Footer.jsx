import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/foods">
        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="drinks-bottom"
        />
      </Link>
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="drinks-bottom"
        />
      </Link>
    </footer>
  );
}
