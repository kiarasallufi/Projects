import React, { useState } from 'react';
import './PizzaList.css';
import Header from './Header';
import ProfilePage from './ProfilePage';

const Pizzas = [
  { id: 1, name: 'Margherita', price: 600, imageUrl: 'https://th.bing.com/th/id/OIP.980GqsRwoZjg94qTuVdBZwHaJ_?rs=1&pid=ImgDetMain', quantity: 10 },
  { id: 2, name: 'Pepperoni', price: 900, imageUrl: 'https://th.bing.com/th/id/R.d0aceb88e50ed528340026d7638c87dc?rik=ov188CzgoMeEvQ&pid=ImgRaw&r=0', quantity: 10 },
  { id: 3, name: 'Capricciosa', price: 950, imageUrl: 'https://th.bing.com/th/id/OIP.NER5u0beFw2eiDwg0dEbNQHaFC?rs=1&pid=ImgDetMain', quantity: 10 },
  { id: 4, name: 'Vegetarian', price: 850, imageUrl: 'https://th.bing.com/th/id/R.09cd32765eccb14b501d190ecef8ae5d?rik=4QWOoyKooI%2fAzw&pid=ImgRaw&r=0', quantity: 10 },
  { id: 5, name: 'BBQ Chicken', price: 1000, imageUrl: 'https://th.bing.com/th/id/R.ba1e3d7e0a2c744b88a68ca0466dda42?rik=iwwINBR19RcWVw&pid=ImgRaw&r=0', quantity: 10 },
  { id: 6, name: 'Four Cheese', price: 950, imageUrl: 'https://th.bing.com/th/id/R.da90f609169c6135f0b03b69bdbdb6a4?rik=itY6HH7MvGvnnQ&pid=ImgRaw&r=0', quantity: 10 },
  { id: 7, name: 'Meat Lovers', price: 1050, imageUrl: 'https://th.bing.com/th/id/OIP.TBwYBVUSVEh_LvGGyAg5HwHaHa?rs=1&pid=ImgDetMain', quantity: 10 },
  { id: 8, name: 'Seafood', price: 1100, imageUrl: 'https://th.bing.com/th/id/OIP.08FJd2Eoyrvs6ytHN70T8wHaE6?rs=1&pid=ImgDetMain', quantity: 10 },
];

const PizzaList = () => {
  const [pizzas, setPizzas] = useState(Pizzas);
  const [cart, setCart] = useState([]);
  const [isCartPage, setIsCartPage] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);

  const handleAddToCart = (pizzaId) => {
    const pizzaToAdd = pizzas.find(pizza => pizza.id === pizzaId);

    if (pizzaToAdd.quantity > 0) {
      const existingPizzaInCart = cart.find(item => item.id === pizzaId);

      if (existingPizzaInCart) {
      
        if (existingPizzaInCart.quantityInCart < 10) {
          const updatedCart = cart.map(item => {
            if (item.id === pizzaId) {
              return { ...item, quantityInCart: item.quantityInCart + 1 };
            }
            return item;
          });
          setCart(updatedCart);

          const updatedPizzas = pizzas.map(pizza => {
            if (pizza.id === pizzaId) {
              return { ...pizza, quantity: pizza.quantity - 1 };
            }
            return pizza;
          });
          setPizzas(updatedPizzas);
        } else {
          alert('You can add a maximum of 10 pizzas to your cart!');
        }
      } else {
        const updatedCart = [...cart, { ...pizzaToAdd, quantityInCart: 1 }];
        setCart(updatedCart);

        const updatedPizzas = pizzas.map(pizza => {
          if (pizza.id === pizzaId) {
            return { ...pizza, quantity: pizza.quantity - 1 };
          }
          return pizza;
        });
        setPizzas(updatedPizzas);
      }
    } else {
      alert('Sorry, this pizza is out of stock!');
    }
  };

  const handleRemoveFromCart = (pizzaId) => {
    const updatedCart = cart.map(item => {
      if (item.id === pizzaId && item.quantityInCart > 0) {
        return { ...item, quantityInCart: item.quantityInCart - 1 };
      }
      return item;
    }).filter(item => item.quantityInCart > 0); 
    setCart(updatedCart);

    const updatedPizzas = pizzas.map(pizza => {
      if (pizza.id === pizzaId) {
        return { ...pizza, quantity: pizza.quantity + 1 };
      }
      return pizza;
    });
    setPizzas(updatedPizzas);
  };

  const handlePlaceOrder = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantityInCart, 0);
    alert('Your order has been placed successfully! Total: ' + totalPrice + ' Leke');
    setCart([]); 
  };

  const goToCartPage = () => {
    setIsCartPage(true);
    setIsProfilePage(false);
  };

  const goBackToPizzaList = () => {
    setIsCartPage(false);
    setIsProfilePage(false);
  };

  const goToProfilePage = () => {
    setIsProfilePage(true);
    setIsCartPage(false);
  };

  return (
    <div>
      <Header 
        cartLength={cart.length}
        goToCartPage={goToCartPage}
        goToProfilePage={goToProfilePage}
      />
      {isCartPage && (
        <div className="cart-page">
          <h2>Your Cart</h2>
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantityInCart}</p>
                    <p>Total: {item.price * item.quantityInCart} Leke</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <div className="cart-summary">
            <button onClick={handlePlaceOrder} disabled={cart.length === 0}>
              Place Order
            </button>
            <p>Total: {cart.reduce((total, item) => total + item.price * item.quantityInCart, 0)} Leke</p>
            <button onClick={goBackToPizzaList}>Back to Pizza List</button>
          </div>
        </div>
      )}
      {isProfilePage && <ProfilePage />}
      {!isCartPage && !isProfilePage && (
        <div className="pizza-list">
          <h2>Our Delicious Pizzas</h2>
          <div className="pizza-grid">
            {pizzas.map(pizza => {
              const pizzaInCart = cart.find(item => item.id === pizza.id);
              const pizzaInCartQuantity = pizzaInCart ? pizzaInCart.quantityInCart : 0;

              return (
                <div key={pizza.id} className="pizza-card">
                  <img src={pizza.imageUrl} alt={pizza.name} className="pizza-image" />
                  <h3>{pizza.name}</h3>
                  <p className="pizza-price">{pizza.price} Leke</p>
                  <p className="pizza-quantity">Available: {pizza.quantity}</p>
                  <div className="pizza-quantity-container">
                    <button 
                      onClick={() => handleAddToCart(pizza.id)} 
                      disabled={pizza.quantity === 0 || pizzaInCartQuantity >= 10}>
                      +
                    </button>
                    <p>{pizzaInCartQuantity}</p>
                    <button 
                      onClick={() => handleRemoveFromCart(pizza.id)} 
                      disabled={pizzaInCartQuantity === 0}>
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaList;
