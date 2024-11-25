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

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderApp() {
  users = loadUsers(); 
  const role = sessionStorage.getItem("role");
  if (role) {
    navigate("dashboard");
  } else {
    navigate();
  }
}

function addUser(event) {
  event.preventDefault();

  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  if (users.some(user => user.username === username)) {
    alert("El nombre de usuario ya existe.");
    return;
  }

  users.push({ username, password, role });
  saveUsers();
  alert("Usuario agregado exitosamente.");

  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("newRole").value = "user";
  renderApp();
}

function editUser(index) {
  const user = users[index];
  const newUsername = prompt("Editar nombre de usuario:", user.username);
  const newPassword = prompt("Editar contraseña:", user.password);
  const newRole = prompt("Editar rol (user/admin):", user.role);

  if (newUsername && newPassword && (newRole === "user" || newRole === "admin")) {
    users[index] = { username: newUsername, password: newPassword, role: newRole };
    saveUsers();
    alert("Usuario editado exitosamente.");
    renderApp();
  } else {
    alert("Edición cancelada o datos inválidos.");
  }
}

function deleteUser(index) {
  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    users.splice(index, 1);
    saveUsers();
    alert("Usuario eliminado exitosamente.");
    renderApp();
  }
}

function userList() {
  return `
     <ul class="list-group">
      ${users.map(user => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${user.username} (${user.role})</span>
          
          
          <div>
            
            <button onclick="editUser(${user.username})" class="btn btn-warning btn-sm mx-1">Editar</button>
            
          
            <button onclick="deleteUser(${user.username})" class="btn btn-danger btn-sm mx-1">Eliminar</button>
          </div>
        </li>
      `).join('')}
    </ul>
  `;
}

function userComponent() {
  return `
     <div class="container my-5 user-management-form"> 
      <h2>Gestión de Usuarios</h2>
      
      <div class="card p-4 shadow-lg">
        
        
        <div class="mb-4">
          ${userList()}
        </div>
        
        <h3 class="mb-3">Agregar Nuevo Usuario</h3>
        
        <form onsubmit="addUser(event)">
          
          <div class="mb-3">
            <input type="text" id="newUsername" class="form-control" placeholder="Nombre de usuario" required />
          </div>
          
          <div class="mb-3">
            <input type="password" id="newPassword" class="form-control" placeholder="Contraseña" required />
          </div>
          
          <div class="mb-3">
            <select id="newRole" class="form-select" required>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          
          <button type="submit" class="btn btn-primary w-100">Agregar Usuario</button>
        </form>
      </div>
      
      
      <div class="mt-4 text-center">
        <button onclick="navigate('dashboard')" class="btn btn-secondary">Volver</button>
      </div>
    </div>
  `;
}
