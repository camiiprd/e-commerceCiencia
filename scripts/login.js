const urlUsers = "https://666cf4a27a3738f7cacb09c9.mockapi.io/ecommerceScience/users";
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

document.addEventListener('DOMContentLoaded', async () => {
    await cargarUsers()
    mostrarUsers()

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            await login()
        })
    }
})

async function cargarUsers(){
    try {
        const response = await fetch(urlUsers)
        const users = await response.json()
        localStorage.setItem('users', JSON.stringify(users))
    } catch (error) {
        console.error('error al cargar usuario', error)
    }
}

async function login(){
    const email = emailInput.value
    const password = passwordInput.value

    const users = JSON.parse(localStorage.getItem('users'))
    const user = users.find(user => user.email === email)

    if (user.password === password) {

        localStorage.setItem('logUser', JSON.stringify({
            name: user.name,
            lastname: user.lastname,
            email: user.email
        }))

        window.location.href = '../index.html'
        
    } else {
        showError('correo o contraseña incorrectos')
    }
}

function showError(message){
    const messageError = document.getElementById('message')
    messageError.textContent = message
}

async function mostrarUsers(){
    const logUser = JSON.parse(localStorage.getItem('logUser'))
    if (logUser) {
        const nameUsers = `${logUser.name} ${logUser.lastname} ${logUser.email}`
        document.getElementById('username').textContent = nameUsers
    }
}

async function logout(){
    localStorage.removeItem('logUser')
    window.location.href = './pages/login.html'
}