document.addEventListener("DOMContentLoaded", function () {
  const urlProducts =
    "https://6679076c18a459f6394daa0b.mockapi.io/ecommerceScience/products";
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var productList = document.getElementById("productList");
  var cartOverlay = document.getElementById("cartOverlay");
  var cartDropdown = document.getElementById("cartDropdown");

  const limitCharacters = (text, limit = 100) => {
    if (text.length > limit) {
      const trimmedText = text.slice(0, limit);
      return `${trimmedText}... <a href="#" class="card-link">Ver más</a>`;
    }
    return text;
  };

  const createProductosCard = (producto, index) => {
    const { title, description, stock, category, image, id, price } = producto;

    const card = document.createElement("div");
    card.classList.add("mb-5");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card", "h-100");

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.classList.add("card-img-top");
    imageElement.alt = `${index}-${title}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerHTML = limitCharacters(description);

    const cardStock = document.createElement("p");
    cardStock.classList.add("card-text", "mt-auto");
    cardStock.textContent = `Stock: ${stock}`;

    const cardCategory = document.createElement("p");
    cardCategory.classList.add("card-text");
    cardCategory.textContent = `Categoria: ${category}`;

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.textContent = `Precio: $${price}`;

    const cardButton = document.createElement("button");
    cardButton.classList.add(
      "btn",
      "btn-dark",
      "btn-sm",
      "add-to-cart",
      "mt-2",
      "align-self-center"
    );
    cardButton.textContent = "Agregar al carrito";
    cardButton.setAttribute("data-id", id);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardStock);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardButton);

    cardInner.appendChild(imageElement);
    cardInner.appendChild(cardBody);
    card.appendChild(cardInner);

    return card;
  };

  async function loadProducts() {
    try {
      let products = [];

      const productsLocalStorage = localStorage.getItem("productoss");
      if (productsLocalStorage) {
        products = JSON.parse(productsLocalStorage);
      } else {
        const response = await fetch(urlProducts, {
          cache: "no-store",
        });
        products = await response.json();

        localStorage.setItem("productoss", JSON.stringify(products));
      }

      renderProducts(products);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  function renderProducts(products) {
    productList.innerHTML = ""; 
    products.forEach((product, index) => {
      const card = createProductosCard(product, index);
      productList.appendChild(card);
    });
  }

  loadProducts();

  function updateCart() {
    var cartList = document.querySelector(".list-group");
    var total = 0;
    var totalQuantity = 0;

    cartList.innerHTML = ""; 

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

  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("add-to-cart")) {
      var productId = event.target.getAttribute("data-id");
      fetch(`${urlProducts}/${productId}`)
        .then((response) => response.json())
        .then((product) => {
          var existingItem = cart.find(
            (item) => item.product === product.title
          );
          if (existingItem) {
            existingItem.quantity++;
          } else {
            cart.push({
              product: product.title,
              price: product.price,
              quantity: 1,
            });
          }
          updateCart();
          showCartOverlay(); 
        })
        .catch((error) => {
          console.error("Error al agregar al carrito:", error);
        });
    }
  });

  function showCartOverlay() {
    cartOverlay.style.display = "block";
  }

  function hideCartOverlay() {
    cartOverlay.style.display = "none";
  }

  cartDropdown.addEventListener("click", function (event) {
    event.stopPropagation(); 
    if (cartOverlay.style.display === "block") {
      hideCartOverlay();
    } else {
      showCartOverlay();
    }
  });

  document.addEventListener("click", function (event) {
    if (!cartOverlay.contains(event.target) && event.target !== cartDropdown) {
      hideCartOverlay();
    }
  });

  var clearCartButton = document.getElementById("clearCartIndex");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      cart = [];
      updateCart();
    });
  }

  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("productoss");
  });

  updateCart();
});
