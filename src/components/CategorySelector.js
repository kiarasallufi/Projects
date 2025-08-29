import React from 'react';

const CategorySelector = ({ handleCategoryChange }) => (
  <nav className="nav-links">
    <button onClick={() => handleCategoryChange('photo')}>Photos</button>
    <button onClick={() => handleCategoryChange('illustration')}>Illustrations</button>
    <button onClick={() => handleCategoryChange('vector')}>Vectors</button>
  </nav>
);

export default CategorySelector;
