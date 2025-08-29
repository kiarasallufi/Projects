import React from 'react';

const PhotoItem = ({ photo }) => (
  <div key={photo.id} className="photo-item">
    <img src={photo.webformatURL} alt={photo.tags} />
    <div className="photo-overlay">
      <button className="love-button">❤️</button>
      <button className="add-to-collection">➕</button>
    </div>
    <p>{photo.tags}</p>
  </div>
);

export default PhotoItem;
