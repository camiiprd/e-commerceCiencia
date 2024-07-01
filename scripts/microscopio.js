// products.js

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');

    // URL del API Mock para obtener productos
    const apiUrl = 'https://6679076c18a459f6394daa0b.mockapi.io/ecommerceScience/products';

    // Obtener productos del API
    async function getProducts() {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Mostrar productos en la página
    async function showProducts(category) {
        const products = await getProducts();
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
        } else {
            productList.innerHTML = filteredProducts.map(product => `
                <div class="col mb-4">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">${product.price}</p>
                            <button class="btn btn-primary">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Detectar clic en el menú desplegable y filtrar productos
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const category = item.textContent.trim();
            showProducts(category); // Llama a la función showProducts con la categoría seleccionada
        });
    });

    // Inicialmente, muestra los productos de la categoría 'Microscopios'
    showProducts('Microscopios');
});
