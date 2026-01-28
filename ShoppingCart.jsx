import { useState } from "react";

export default function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  // 1. Add item
  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 2. Remove item
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // 3. Update quantity
  const updateQuantity = (id, qty) => {
    if (qty === 0) return removeItem(id);

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // 4. Subtotal
  const getSubtotal = () =>
    items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // 5. Tax (8.5%)
  const getTax = () => getSubtotal() * 0.085;

  // 6. Promo
  const applyPromoCode = (code) => {
    setPromoCode(code);
  };

  const getDiscount = () => {
    const subtotal = getSubtotal();
    if (promoCode === "SAVE10") return subtotal * 0.10;
    if (promoCode === "SAVE20") return subtotal * 0.20;
    if (promoCode === "FREESHIP") return 9.99;
    return 0;
  };

  // 7. Total
  const getTotal = () =>
    getSubtotal() + getTax() - getDiscount();

  // 8. Clear cart
  const clearCart = () => {
    setItems([]);
    setPromoCode("");
  };

  // 9. Item count
  const getItemCount = () =>
    items.reduce((c, i) => c + i.quantity, 0);

  // 10. Empty check
  const isEmpty = () => items.length === 0;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {isEmpty() && <p>Your cart is empty</p>}
    </div>
  );
}
