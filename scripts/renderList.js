const productos = [
    {
        "name": "Kit de microscopio digital Celestron",
        "imageURL": "https://www.ozscopes.com.au/pub/media/catalog/product/cache/45eb0a64749ceaa7c5482dc7c014d2da/c/e/celestron-digital-microscope-kit-disc_1.jpg",
        "description": [
            "Uso como microscopio biológico, tradicional o digital", 
            "Ampliación de amplio rango",
             "Fácil de configurar",
              "Incluye el accesorio de la cámara digital y el software de la computadora",
               "3 diapositivas preparadas",
                "Ligero y portátil",
                 "Garantía limitada de 2 años",
                ],
        "price": "U$D 149.95",
      },
      
                    
]
console.log(productos)

console.log(productos);

const limitCharacters = (text, limit = 100) => {
    return text.length > limit ? `${text.slice(0, limit)}(...)` : text;
};

const sectionToRender = document.getElementById("mis_productos");

const classesToApplyFlexboxInSection = ["d-flex", "flex-wrap", "justify-content-evenly"];
sectionToRender.classList.add(...classesToApplyFlexboxInSection);

const createProductosCard = (producto, index) => {
    console.log({ producto, index });
    const { name, imageURL, description, price } = producto;

    const limitDescription = limitCharacters(description.join(' '), 250);

    
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    const image = document.createElement("img");
    image.src = imageURL;
    image.classList.add("card-img-top");
    image.alt = `${index}-${name}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.style.display = "flex";
    cardBody.style.flexDirection = "column";
    cardBody.style.justifyContent = "space-between";

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = name;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = limitDescription;

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.textContent = price;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);

    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
};

const renderProducto = () => {
    productos.forEach((producto, index) => {
        const productoCard = createProductosCard(producto, index);
        sectionToRender.appendChild(productoCard);
    });
};

renderProducto();