const apiBaseURL = "https://fakestoreapi.com";

// Function to fetch categories from the API
async function fetchCategories() {
  try {
    const response = await fetch(`${apiBaseURL}/products/categories`);
    const categories = await response.json();
    displayCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Function to display categories
function displayCategories(categories) {
  const categoriesNav = document.getElementById("categoriesNav");
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.classList.add("category-btn");
    btn.textContent = category;
    btn.onclick = () => fetchProductsByCategory(category);
    categoriesNav.appendChild(btn);
  });
}

// Function to fetch products by category from the API
async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(`${apiBaseURL}/products/category/${category}`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to fetch all products from the API
async function fetchAllProducts() {
  try {
    const response = await fetch(`${apiBaseURL}/products`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to display products in a multi-column table
function displayProducts(products) {
  const productsTable = document.getElementById("productsTable");
  productsTable.innerHTML = ""; // Clear previous content

  // Create a 3-column table
  const numColumns = 3;
  let currentRow = null;

  products.forEach((product, index) => {
    if (index % numColumns === 0) {
      currentRow = document.createElement("tr");
      productsTable.appendChild(currentRow);
    }

    const cell = document.createElement("td");
    cell.innerHTML = `
            <img src="${product.image}" alt="${
      product.title
    }" class="product-image">
            <div class="product-name">${product.title}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button onclick="addToCart('${product.title}', ${
      product.price
    })">Add to Cart</button>
        `;
    currentRow.appendChild(cell);
  });
}

// Function to toggle the display of categories
function toggleCategories() {
  const categoriesNav = document.getElementById("categoriesNav");
  categoriesNav.style.display =
    categoriesNav.style.display === "none" ? "flex" : "none";
}

// Function to add products to the cart
let cart = [];
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize the page with all products displayed
fetchAllProducts();
fetchCategories();
