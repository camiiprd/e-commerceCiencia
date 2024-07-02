

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");

  
  const apiUrl =
    "https://6679076c18a459f6394daa0b.mockapi.io/ecommerceScience/products";

  
  async function getProducts() {
    try {
      const response = await fetch(apiUrl);
      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  
  async function showProducts(category) {
    const products = await getProducts();
    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
      productList.innerHTML =
        "<p>No hay productos disponibles en esta categoría.</p>";
    } else {
      productList.innerHTML = filteredProducts
        .map(
          (product) => `
                <div class=" mb-4">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">${product.price}</p>
                            <button class="btn btn-dark">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

   
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", async function (event) {
        const productId = button.getAttribute("data-id");

        try {
          const response = await fetch(`${apiUrl}/${productId}`);
          const product = await response.json();
          
          console.log("Agregando al carrito:", product);
        } catch (error) {
          console.error("Error al agregar al carrito:", error);
        }
      });
    });
  


function updateCart() {
  var cartList = document.querySelector(".list-group");
  var total = 0;
  var totalQuantity = 0;

  cartList.innerHTML = ""; // Limpiar contenido actual

  cart.forEach(function (item) {
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = `${item.product} - $${item.price.toFixed(2)} x ${
      item.quantity
    }`;
    cartList.appendChild(listItem);
    total += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  document.querySelector(".total-price").textContent = `$${total.toFixed(2)}`;
  document.querySelector(".badge").textContent = totalQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
}

updateCart()
  
  // Detectar clic en el menú desplegable y filtrar productos
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const category = item.textContent.trim();
      showProducts(category); // Llama a la función showProducts con la categoría seleccionada
    });
  });

  // Inicialmente, muestra los productos de la categoría 'Microscopios'
  showProducts("Microscopios");
});

