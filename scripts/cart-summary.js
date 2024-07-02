document.addEventListener("DOMContentLoaded", function () {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartSummary() {
    var cartSummary = document.getElementById("cartSummary");
    var total = 0;
    var totalQuantity = 0;

    cartSummary.innerHTML = "";

    if (cart.length === 0) {
      cartSummary.innerHTML = "<p>No hay productos en el carrito.</p>";
      document.getElementById("checkout").disabled = true;
    } else {
      cart.forEach(function (item, index) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "mt-4");
        cartItem.innerHTML = `
                    <h5>${item.product} (${item.quantity})</h5>
                    <p>Precio: $${item.price.toFixed(2)}</p>
                    <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-outline-secondary increase-quantity" data-index="${index}">+</button>
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Eliminar</button>
                `;
        cartSummary.appendChild(cartItem);
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
      });

      document.getElementById("checkout").disabled = false;

      var totalPriceElement = document.getElementsByClassName("total-price")[1];
      var totalQuantityElement = document.querySelector(".total-quantity");

      console.log(totalPriceElement, total);
      if (totalPriceElement) {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
      } else {
        console.error("Elemento .total-price no encontrado.");
      }

      if (totalQuantityElement) {
        totalQuantityElement.textContent = totalQuantity;
      } else {
        console.error("Elemento .total-quantity no encontrado.");
      }
    }
  }

  function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  document
    .getElementById("cartSummary")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-item")) {
        var index = parseInt(event.target.getAttribute("data-index"));
        cart.splice(index, 1);
        updateCartSummary();
        updateLocalStorage();

        if (cart.length === 0) {
          var clearCartEvent = new Event("clearCartEvent");
          document.dispatchEvent(clearCartEvent);
        }
      } else if (event.target.classList.contains("decrease-quantity")) {
        var index = parseInt(event.target.getAttribute("data-index"));
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        updateCartSummary();
        updateLocalStorage();
      } else if (event.target.classList.contains("increase-quantity")) {
        var index = parseInt(event.target.getAttribute("data-index"));
        cart[index].quantity++;
        updateCartSummary();
        updateLocalStorage();
      }
    });

  document.getElementById("checkout").addEventListener("click", function () {
    alert("Gracias por su compra!");
    cart = [];
    updateCartSummary();
    updateLocalStorage();

    window.location.href = "/index.html";
  });

  document.getElementById("clearCart").addEventListener("click", function () {
    cart = [];
    updateCartSummary();
    updateLocalStorage();
  });

  updateCartSummary();
});
