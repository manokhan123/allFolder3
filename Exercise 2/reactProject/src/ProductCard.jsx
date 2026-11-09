function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <div className="ticket">
      <div className="ticket-perforation" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="ticket-body">
        <span className="ticket-category">{product.category}</span>
        <h3 className="ticket-name">{product.name}</h3>

        <div className="ticket-price">
          <span className="currency">Rs.</span>
          {product.price.toLocaleString()}
        </div>

        <div
          className={`ticket-stock ${
            isOutOfStock ? "out" : isLowStock ? "low" : "in"
          }`}
        >
          <span className="dot" />
          {isOutOfStock
            ? "Out of stock"
            : isLowStock
              ? `Only ${product.stock} left`
              : `In stock, ${product.stock}`}
        </div>

        <button
          className="stamp-btn"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product)}
        >
          {isOutOfStock ? "Unavailable" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
