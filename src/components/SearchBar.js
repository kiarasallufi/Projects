import React, { useState, useEffect } from 'react';

const SearchBar = ({ setInput }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setInput(inputValue);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, setInput]);

  return (
    <div className="search-bar">
      <input
        placeholder="Type to search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
