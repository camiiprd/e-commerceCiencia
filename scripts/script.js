// CARRITO NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const carritoIcon = document.getElementById("carrito-icon");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  carritoIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Array de objetos con información de las imágenes
  var images = [
    {
      src: "./assets/assets-slider/1.png",
      alt: "Slide 1",
    },
    {
      src: "./assets/assets-slider/2.png",
      alt: "Slide 2",
    },
    {
      src: "./assets/assets-slider/3.png",
      alt: "Slide 3",
    },
  ];

  // Obtener el contenedor del carrusel
  var carouselInner = document.querySelector(".carousel-inner");

  // Recorrer el array de objetos y crear los elementos .carousel-item
  images.forEach(function (imageObj, index) {
    var carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }
    var img = document.createElement("img");
    img.src = imageObj.src;
    img.classList.add("d-block", "w-100");
    img.alt = imageObj.alt;
    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  });

  // Inicializar el carrusel utilizando Bootstrap 5
  var myCarousel = document.getElementById("carouselExample");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 4000, // Cambia cada 5 segundos (opcional)
    wrap: true, // Permite el rebobinado del carrusel (opcional)
  });
});

//footer

const developerRow = document.getElementById("developers-row");

const urlMockApi =
  "https://666cf4a27a3738f7cacb09c9.mockapi.io/ecommerceScience/developers";

console.log("URL de la API:", urlMockApi);

// Función para obtener datos del desarrollador desde MockAPI de manera asíncrona
const fetchDeveloperData = async () => {
  try {
    // Verificar si hay datos en localStorage
    const storedDevelopers = localStorage.getItem("devs");
    if (storedDevelopers) {
      const developers = JSON.parse(storedDevelopers);
      updateFooter(developers);
    } else {
      // Si no hay datos en localStorage, hacer la solicitud a MockAPI
      const response = await fetch(urlMockApi);
      console.log("Respuesta de la API:", response);
      const data = await response.json();
      console.log("Datos del desarrollador:", data);
      if (data && data.length > 0) {
        // Guardar en localStorage
        localStorage.setItem("devs", JSON.stringify(data));
        updateFooter(data);
      }
    }
  } catch (error) {
    console.error("Error al obtener los datos del desarrollador:", error);
  }
};

// Función para actualizar el contenido del footer
const updateFooter = (developers) => {
  developerRow.innerHTML = ""; // Limpia el contenido actual
  developers.forEach((developer) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
            <span>${developer.name}</span>
            <a href="${developer.git}" target="_blank">
                <i class="fa-brands fa-github fa-2x"></i>
            </a>
            <a href="mailto:${developer.mail}">
                <i class="fa-regular fa-envelope fa-2x"></i>
            </a>
        `;
    developerRow.appendChild(col);
  });
};

// Llamar a la función fetchDeveloperData cuando se carga el DOM
document.addEventListener("DOMContentLoaded", fetchDeveloperData);

//carrito

document.getElementById('cartDropdown').onclick = function() {
  var cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay.style.display === 'block') {
      cartOverlay.style.display = 'none';
  } else {
      cartOverlay.style.display = 'block';
  }
};

// Evento al hacer clic en el ícono del carrito para mostrar/ocultar el overlay del carrito
document.getElementById('cartDropdown').onclick = function(event) {
  var cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay.style.display === 'block') {
      cartOverlay.style.display = 'none';
  } else {
      cartOverlay.style.display = 'block';
  }
  event.stopPropagation(); // Evitar que el clic se propague y cierre inmediatamente
};

// Evento al hacer clic en cualquier parte del documento para cerrar el overlay del carrito si está abierto
document.addEventListener('click', function(event) {
  var cartOverlay = document.getElementById('cartOverlay');
  var cartDropdown = document.getElementById('cartDropdown');
  
  if (cartOverlay.style.display === 'block' && !cartDropdown.contains(event.target) && event.target.id !== 'cartOverlay') {
      cartOverlay.style.display = 'none';
  }
});


// Función para agregar un producto al carrito
function addToCart(title, price) {
  // Lógica para agregar un producto al carrito (ejemplo simplificado)
  console.log(`Agregando "${title}" al carrito por $${price}`);
}

// Evento al hacer clic en botones "Agregar al carrito"
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
      var title = event.target.getAttribute('data-title');
      var price = parseFloat(event.target.getAttribute('data-price'));
      addToCart(title, price);
  }
});

// Llama a la función para mostrar productos cuando la página está lista
document.addEventListener('DOMContentLoaded', function() {
  displayProducts();
});