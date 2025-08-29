import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';
import SearchBar from './SearchBar';
import PhotoItem from './PhotoItem';
import Pagination from './Pagination';
import './SearchBar.css';

export const SearchBarContainer = () => {
  const [input, setInput] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('photo');

  const API_KEY = '47622786-4d9095b3e848040ed16f54bc3';

  const fetchPhotos = (searchQuery = '') => {
    setLoading(true); 
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=${category}&page=${page}&per_page=30`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.hits);
        setLoading(false); 
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching photos');
        console.error('Error fetching photos:', error);
      });
  };

  useEffect(() => {
    fetchPhotos(input); 
  }, [page, category]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (input) {
        fetchPhotos(input); 
      } else {
        fetchPhotos();
      }
    }, 500); 

    return () => clearTimeout(debounceTimeout); 
  }, [input, page, category]); 

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPage(1); 
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="input-wrapper">
      <CategorySelector handleCategoryChange={handleCategoryChange} />
      <SearchBar setInput={setInput} />

      {error && <p className="error-message">{error}</p>}

     
      {loading && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      )}

      <div className="photos-wrapper">
        {photos.length > 0 ? (
          photos.map((photo) => <PhotoItem key={photo.id} photo={photo} />)
        ) : (
          !loading && <p>No photos found</p>
        )}
      </div>

      {photos.length > 0 && !loading && (
        <Pagination page={page} changePage={changePage} loading={loading} />
      )}
    </div>
  );
};
