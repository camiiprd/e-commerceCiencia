const urlUsers = "https://666cf4a27a3738f7cacb09c9.mockapi.io/ecommerceScience/users";
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(urlUsers);
        const users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Error al cargar usuarios', error);
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await login(); // Esperar a que la función login termine
    });
});

async function login() {
    const email = emailInput.value;
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.email === email);

    if (user) {
        if (user.password === password) {
            // Login exitoso, redirigir al index
            window.location.href = '../index.html';
        } else {
            showError('Correo o Contraseña incorrecto');
        }
    } else {
        showError('Correo o contraseña incorrecto');
    }
}

function showError(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}
