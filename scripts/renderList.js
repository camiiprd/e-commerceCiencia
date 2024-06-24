const urlProductos = "https://6679076c18a459f6394daa0b.mockapi.io/ecommerceScience/products";

document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
});

async function cargarProductos() {
    try {
        let productos = [];

        // Intentar obtener productos del localStorage primero
        const productosLocalStorage = localStorage.getItem('productoss');
        if (productosLocalStorage) {
            productos = JSON.parse(productosLocalStorage);
            console.log('Productos cargados desde localStorage:', productos);
        } else {
            const response = await fetch(urlProductos);
            productos = await response.json();
            console.log('Productos cargados desde API:', productos);

            // Guardar productos en el localStorage
            localStorage.setItem('productoss', JSON.stringify(productos));
        }

        renderizarProductos(productos);
    } catch (error) {
        console.error('Error al cargar productos', error);
    }
}

const sectionToRender = document.getElementById("mis_productos");

const limitCharacters = (text, limit = 100) => {
    return text.length > limit ? `${text.slice(0, limit)}(...)` : text;
};

const createProductosCard = (producto, index) => {
    const { title, description, stock, category, image, idProduct, price } = producto;

    const limitDescription = limitCharacters(description, 250);

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.classList.add("card-img-top");
    imageElement.alt = `${index}-${title}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.textContent = limitDescription;

    const cardStock = document.createElement("p");
    cardStock.classList.add("card-text");
    cardStock.textContent = `Stock: ${stock}`;

    const cardCategory = document.createElement("p");
    cardCategory.classList.add("card-text");
    cardCategory.textContent = `Category: ${category}`;

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.textContent = `Price: ${price}`;

    const cardLink = document.createElement("a");
    cardLink.href = "#";
    cardLink.classList.add("btn", "btn-danger");
    cardLink.textContent = "Comprar";
    cardLink.target = "_blank";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardStock);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardLink);

    card.appendChild(imageElement);
    card.appendChild(cardBody);

    return card;
};


const renderizarProductos = (productos) => {
    productos.forEach((producto, index) => {
        const productoCard = createProductosCard(producto, index);
        sectionToRender.appendChild(productoCard);
    });
};
