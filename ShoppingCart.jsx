// ShoppingCart.jsx
import { useState } from 'react';

export default function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');

  const addItem = (product) => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (productId) => {
    setItems(items.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(productId);
    } else {
      setItems(items.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.085;
  };

  const applyPromoCode = (code) => {
    setPromoCode(code);
    const subtotal = getSubtotal();
    
    if (code === 'SAVE10') return subtotal * 0.10;
    if (code === 'SAVE20') return subtotal * 0.20;
    if (code === 'FREESHIP') return 9.99; // Free shipping discount
    
    return 0;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const tax = getTax();
    const discount = applyPromoCode(promoCode);
    return subtotal + tax - discount;
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const isEmpty = () => {
    return items.length === 0;
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {isEmpty() ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>Subtotal: ${getSubtotal().toFixed(2)}</p>
            <p>Tax (8.5%): ${getTax().toFixed(2)}</p>
            <p>Total: ${getTotal().toFixed(2)}</p>
            <p>Items: {getItemCount()}</p>
          </div>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}
