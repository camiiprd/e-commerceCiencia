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
