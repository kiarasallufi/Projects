import React, { useState } from 'react';
import Header from './Header';
import PizzaList from './PizzaList';
import ProfilePage from './ProfilePage';

function App() {
  const [orders, setOrders] = useState([]);
  const [userName] = useState('Kiara Sallufi');
  const [currentPage, setCurrentPage] = useState('home'); 

  const totalPrice = orders.reduce((total, order) => total + order.price * order.quantityInCart, 0);

 
  const goToProfilePage = () => {
    setCurrentPage('profile'); 
  };

 
  const goToHomePage = () => {
    setCurrentPage('home'); 
  };

  return (
    <div className="App">
      
      {currentPage === 'home' && <PizzaList setOrders={setOrders} />}
      {currentPage === 'profile' && <ProfilePage />}
    </div>
  );
}

export default App;
