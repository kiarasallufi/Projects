import React from 'react';
import './Header.css';

const Header = ({ userName, cartLength, goToCartPage, goToProfilePage }) => {
  return (
    <header className="header">
      <h1>My Pizza</h1>
      <div className="header-buttons">
        <button onClick={goToProfilePage} className="profile-btn">
        👤
        </button>
        <button onClick={goToCartPage} className="view-cart-btn">
        🛒 ({cartLength})
        </button>
      </div>
    </header>
  );
};

export default Header;
