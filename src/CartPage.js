import React from 'react';
import './CartPage.css';

const CartPage = ({ cart, setCart, goBackToPizzaList, handlePlaceOrder }) => {

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (pizzaId) => {
    const updatedCart = cart.filter(item => item.id !== pizzaId);
    setCart(updatedCart);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Total: {item.price * item.quantity} Leke</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="cart-summary">
        <p><strong>Total Price:</strong> {totalPrice} Leke</p>
        <button onClick={handlePlaceOrder} disabled={cart.length === 0}>
          Place Order
        </button>
        <button onClick={goBackToPizzaList}>
          Back to Pizza List
        </button>
      </div>
    </div>
  );
};

export default CartPage;
