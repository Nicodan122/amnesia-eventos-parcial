function dashboardComp() {
  const role = sessionStorage.getItem("role");
  return `
      <h2 class="welcome-title">Hola Devuelta: ${role === "admin" ? "Administrador" : "Usuario"}</h2>
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card custom-card">
          <div class="card-body text-center d-flex flex-column align-items-center">
            <img src="img/gestion.png" alt="gestion" class="icon mb-3">
            <button class="btn btn-success w-100" onclick="navigate('rental')">Gestión de Reservas</button>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card custom-card">
          <div class="card-body text-center d-flex flex-column align-items-center">
            <img src="img/equipos.png" alt="Equipos" class="icon mb-3">
            <button class="btn btn-info w-100" onclick="navigate('rentalTotal')">Alquileres Total</button>
          </div>
        </div>
      </div>

    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card custom-card">
          <div class="card-body text-center d-flex flex-column align-items-center">
            <img src="img/precios.png" alt="Icono Precios" class="icon mb-3">
            <button class="btn btn-primary w-100" onclick="renderPrices()">Precios</button>
          </div>
        </div>
      </div>

      ${role === "admin" ? `
        <div class="col-md-4 mb-3">
          <div class="card custom-card">
            <div class="card-body text-center d-flex flex-column align-items-center">
              <img src="img/usuarios.png" alt="Crud Usuarios" class="icon mb-3">
              <button class="btn btn-danger w-100" onclick="navigate('users')">Gestión de Usuarios</button>
            </div>
          </div>
        </div>
      ` : ""}

      ${role === "user" ? `
        <div class="col-md-4 mb-3">
          <div class="card custom-card">
            <div class="card-body text-center d-flex flex-column align-items-center">
              <img src="img/usuarios.png" alt="Crud Usuarios" class="icon mb-3">
              <button class="btn btn-danger w-100" onclick="navigate('perfil')">Mi Perfil</button>
            </div>
          </div>
        </div>
      ` : ""}

      <div class="col-md-4 mb-3">
        <div class="card custom-card">
          <div class="card-body text-center d-flex flex-column align-items-center">
            <img src="img/salida.png" alt="Salida icono" class="icon mb-3">
            <button class="btn btn-secondary w-100" onclick="logout()">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  `;
}


function logout() {
  sessionStorage.clear();
  renderApp();
}
