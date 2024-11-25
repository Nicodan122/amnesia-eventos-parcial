function loadUsers() {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    return JSON.parse(storedUsers);
  } else {
    return [
      { username: "admin", password: "123", role: "admin" },
      { username: "user", password: "123", role: "user" }
    ];
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = loadUsers();

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    sessionStorage.setItem("role", user.role);
    renderApp(); 
  } else {
    alert("Ese no es ul usaurio o contrasenia");
  }
}

function showLoginForm() {
  return `
    <div class="login-container">
      <h1>Amnesia Rentals: Eventos</h1>
      <h2>Accede a tu cuenta</h2>
      <div class="form-container">
        <input type="text" id="username" placeholder="Usuario" />
        <input type="password" id="password" placeholder="Contraseña" />
        <button onclick="login()">Iniciar Sesión</button>
      </div>
    </div>
  `;
}

