import React, { useState } from 'react';
import './ProfilePage.css';
const ProfilePage = () => {

  const [name, setName] = useState('Kiara');
  const [email, setEmail] = useState('kiarasallufi78@gmail.com');
  const [address, setAddress] = useState('Tirana, Albania');

 
  const [isEditing, setIsEditing] = useState(false);

 
  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleSave = () => {
    setIsEditing(false);
    alert('Changes Saved!');
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'address') setAddress(value);
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <div className="profile-details">
        <div>
          <label>Name:</label>
          {isEditing ? (
            <input type="text" name="name" value={name} onChange={handleChange} />
          ) : (
            <p>{name}</p>
          )}
        </div>
        <div>
          <label>Email:</label>
          {isEditing ? (
            <input type="email" name="email" value={email} onChange={handleChange} />
          ) : (
            <p>{email}</p>
          )}
        </div>
        <div>
          <label>Address:</label>
          {isEditing ? (
            <input type="text" name="address" value={address} onChange={handleChange} />
          ) : (
            <p>{address}</p>
          )}
        </div>
      </div>

     
      {isEditing ? (
        <button onClick={handleSave}>Save Changes</button>
      ) : (
        <button onClick={handleEdit}>Update</button>
      )}
    </div>
  );
};

export default ProfilePage;
