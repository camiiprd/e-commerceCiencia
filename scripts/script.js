document.addEventListener("DOMContentLoaded", function () {
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

  var carouselInner = document.querySelector(".carousel-inner");

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

  var myCarousel = document.getElementById("carouselExample");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 4000,
    wrap: true, 
  });
});

const developerRow = document.getElementById("developers-row");
const urlMockApi =
  "https://666cf4a27a3738f7cacb09c9.mockapi.io/ecommerceScience/developers";


const fetchDeveloperData = async () => {
  try {
    const storedDevelopers = localStorage.getItem("devs");
    if (storedDevelopers) {
      const developers = JSON.parse(storedDevelopers);
      updateFooter(developers);
    } else {
      const response = await fetch(urlMockApi);
      console.log("Respuesta de la API:", response);
      const data = await response.json();
      console.log("Datos del desarrollador:", data);
      if (data && data.length > 0) {
        localStorage.setItem("devs", JSON.stringify(data));
        updateFooter(data);
      }
    }
  } catch (error) {
    console.error("Error al obtener los datos del desarrollador:", error);
  }
};


const updateFooter = (developers) => {
  developerRow.innerHTML = ""; 
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

document.addEventListener("DOMContentLoaded", fetchDeveloperData);
