function rentalTotalComp() {
  return `
    <div class="container my-5">
      <!-- Título principal -->
      <h2 class="fw-bold mb-4 text-center">Historial de Alquiler</h2>
      
      <!-- Sección de Reservas Futuras o en Proceso -->
      <div class="mb-4">
        <h3 class="fw-bold text-primary mb-3">Reservas Futuras o en Proceso</h3>
        ${upcomingReservations()}
      </div>
      
      <!-- Sección de Reservas Antiguas -->
      <div class="mb-4">
        <h3 class="fw-bold text-secondary mb-3">Reservas Antiguas</h3>
        ${pastReservations()}
      </div>
      
      <!-- Botón Volver -->
      <div class="text-center mt-4">
        <button onclick="navigate('dashboard')" class="btn btn-danger">Volver</button>
      </div>
    </div>
  `;
}

function upcomingReservations() {
  const today = new Date();
  const futureReservations = reservations.filter(
    (reservation) =>
      new Date(`${reservation.date}T${reservation.time}`) >= today &&
      reservation.status === "Pendiente"
  );

  if (futureReservations.length === 0) return "<p>No hay reservas futuras.</p>";

  return `
    <ul class="list-group">
      ${futureReservations
        .map(
          (reservation) => `
          <li class="list-group-item">
            <strong>Cancha:</strong> ${reservation.fieldType} | 
            <strong>Fecha:</strong> ${reservation.date} | 
            <strong>Hora:</strong> ${reservation.time} | 
            <strong>Estado:</strong> ${reservation.status}
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function pastReservations() {
  const today = new Date();
  const oldReservations = reservations.filter(
    (reservation) =>
      new Date(`${reservation.date}T${reservation.time}`) < today || 
      reservation.status !== "Pendiente"
  );

  if (oldReservations.length === 0) return "<p>No hay reservas antiguas.</p>";

  return `
    <ul class="list-group">
      ${oldReservations
        .map(
          (reservation) => `
          <li class="list-group-item">
            <strong>Cancha:</strong> ${reservation.fieldType} | 
            <strong>Fecha:</strong> ${reservation.date} | 
            <strong>Hora:</strong> ${reservation.time} | 
            <strong>Estado:</strong> ${reservation.status}
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function renderPastReservations() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="container my-5">
      <h2 class="fw-bold text-center mb-4">Reservas Antiguas</h2>
      ${pastReservations()}
      <div class="text-center mt-4">
        <button onclick="navigate('dashboard')" class="btn btn-danger">Volver al Dashboard</button>
      </div>
    </div>
  `;
}
