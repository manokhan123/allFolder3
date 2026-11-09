import { useState } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 85000, stock: 5 },
  { id: 2, name: "Mouse", category: "Accessories", price: 1500, stock: 0 },
  { id: 3, name: "Keyboard", category: "Accessories", price: 3500, stock: 10 },
  { id: 4, name: "Monitor", category: "Electronics", price: 25000, stock: 3 },
  { id: 5, name: "USB Cable", category: "Accessories", price: 700, stock: 15 },
];

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Product catalog</h1>

        <div className="cart-counter">
          <span className="cart-label">Cart</span>
          <span className="cart-value">{cartCount}</span>
        </div>
      </header>

      <div className="ticket-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
