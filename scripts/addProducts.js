
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(productForm);
        const productData = {
            title: formData.get('title'),
            description: formData.get('description'),
            stock: parseInt(formData.get('stock')),
            category: formData.get('category'),
            image: formData.get('image'),
            price: parseFloat(formData.get('price'))
        };

        fetch('https://6679076c18a459f6394daa0b.mockapi.io/ecommerceScience/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear el producto.');
            }
            return response.json();
        })
        .then(data => {
            alert('Producto creado exitosamente.');
            
                        productForm.reset(); // 
        })
        .catch(error => {
            console.error('Error al crear el producto:', error);
            alert('Hubo un error al crear el producto. Por favor, intenta nuevamente.');
        });
    });
});
