function userProfileComp() {
    const username = sessionStorage.getItem("username") || "Usuario";
  
    return `
      <div class="container my-5">
        <h2 class="text-center fw-bold">Bienvenido, ${username}!</h2>
        <h3 class="text-center mt-4">Mis Reservas</h3>
  
        ${userReservationsTable()}
  
        <div class="text-center mt-4">
          <button onclick="navigate('dashboard')" class="btn btn-danger">Volver</button>
        </div>
      </div>
    `;
  }
  
  function userReservationsTable() {
    const userReservations = reservations.filter(
      (reservation) => reservation.user === sessionStorage.getItem("userName")
    );
  
    if (userReservations.length === 0) {
      return `<p class="text-center mt-4">No tienes reservas realizadas.</p>`;
    }
  
    return `
      <div class="table-responsive">
        <table class="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Alquiler</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${userReservations
              .map(
                (reservation) => `
                <tr>
                  <td>${reservation.date}</td>
                  <td>${reservation.time}</td>
                  <td>${reservation.fieldType}</td>
                  <td>${reservation.status}</td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }