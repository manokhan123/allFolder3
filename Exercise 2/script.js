// QUESTION NO1 -> PART 1

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 85000, stock: 5 },
  { id: 2, name: "Mouse", category: "Accessories", price: 1500, stock: 0 },
  { id: 3, name: "Keyboard", category: "Accessories", price: 3500, stock: 10 },
  { id: 4, name: "Monitor", category: "Electronics", price: 25000, stock: 3 },
  { id: 5, name: "USB Cable", category: "Accessories", price: 700, stock: 15 },
];

function displayAvailableProducts(products) {
  console.log("========== AVAILABLE PRODUCTS ==========");

  products.forEach((product) => {
    if (product.stock > 0) {
      console.log(
        `${product.name} | Category: ${product.category} | Price: Rs. ${product.price} | Stock: ${product.stock}`,
      );
    }
  });
}

displayAvailableProducts(products);

// QUESTION NO1 -> PART 2

const cartItems = [
  { name: "Laptop", price: 85000, quantity: 1 },
  { name: "Keyboard", price: 3500, quantity: 2 },
  { name: "USB Cable", price: 700, quantity: 2 },
];

function calculateOrder(cartItems) {
  let subtotal = 0;

  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let discount = 0;

  if (subtotal > 50000) {
    discount = subtotal * 0.1;
  }

  let finalTotal = subtotal - discount;

  console.log("========== ORDER CALCULATION ==========");
  console.log(`Subtotal    : Rs. ${subtotal}`);
  console.log(`Discount    : Rs. ${discount}`);
  console.log(`Final Total : Rs. ${finalTotal}`);
}

calculateOrder(cartItems);

// QUESTION NO1 -> PART 3

function createInvoice(cartItems) {
  let subtotal = 0;

  console.log("========================================");
  console.log("             ORDER INVOICE");
  console.log("========================================");

  cartItems.forEach((item) => {
    let itemTotal = item.price * item.quantity;

    subtotal += itemTotal;

    console.log(
      `${item.name} | Rs. ${item.price} x ${item.quantity} = Rs. ${itemTotal}`,
    );
  });

  let discount = 0;

  if (subtotal > 50000) {
    discount = subtotal * 0.1;
  }

  let finalTotal = subtotal - discount;

  console.log("----------------------------------------");
  console.log(`Subtotal     : Rs. ${subtotal}`);
  console.log(`Discount     : Rs. ${discount}`);
  console.log(`Final Total  : Rs. ${finalTotal}`);
  console.log("========================================");
}

createInvoice(cartItems);
