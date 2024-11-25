function rentalComp() {
  const role = sessionStorage.getItem("role");

  return `
     <div class="container my-5 text-center">
      <h2 class="fw-bold mb-4">Gestión de Reservas</h2>
      
      
      ${role === "admin" ? adminReservationList() : userReservationForm()}
      
      <div class="mt-4">
        <button onclick="navigate('dashboard')" class="btn btn-danger">Volver</button>
      </div>
    </div>
  `;
}


function userReservationForm() {
  return `
     <div class="container my-5">
      <h3 class="text-center mb-4">Reservar una Cancha</h3>
      <form onsubmit="makeReservation(event)" class="card p-4 shadow-lg bg-light">
        
        <div class="mb-3">
          <label for="fieldType" class="form-label">Tipo de Cancha:</label>
          <select id="fieldType" class="form-select" required>
            <option value="Combo audio" style="color: black;">Combo audio</option>
            <option value="Combo audio plus" style="color: black;">Combo audio plus</option>
            <option value="Combo audio premium" style="color: black;">Combo audio premium</option>
            <option value="Combo luces" style="color: black;">Combo luces</option>
            <option value="Combo luces plus" style="color: black;">Combo luces plus</option>
          </select>
        </div>

        
        <div class="mb-3">
          <label for="date" class="form-label">Fecha:</label>
          <input type="date" id="date" class="form-control" required />
        </div>

       
        
          <label for="time" class="form-label">Hora:</label>
          <input type="time" id="time" class="form-control" required />
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary w-100">Reservar</button>
        </div>
      </form>
    </div>
  `;
}

function makeReservation(event) {
  event.preventDefault();

  const fieldType = document.getElementById("fieldType").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const user = sessionStorage.getItem("role") === "admin" ? "admin" : "user";

  const newReservation = { user, fieldType, date, time, status: "Pendiente" };
  reservations.push(newReservation);

  alert("Reserva realizada con éxito");
  renderApp();
}

function userReservationList() {
  const userReservations = reservations.filter(
    (reservation) => reservation.user === "user"
  );

  return `
    <h3>Mis Reservas</h3>
    <ul>
      ${userReservations
        .map(
          (reservation) => `
          <li>
            Fecha: ${reservation.date} | Hora: ${reservation.time} | Estado: ${reservation.status}
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function createReservation(event) {
  event.preventDefault();
  
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  
  const newReservation = {
    user: sessionStorage.getItem("role"),
    date,
    time,
    status: "Pendiente",
  };

  reservations.push(newReservation);
  alert("Reserva creada con éxito.");
  renderApp();
}

function adminReservationList() {
  return `
    <div class="container my-5">
      <h3 class="text-center mb-4">Listado de Reservas</h3>
      <form class="card p-4 shadow-lg bg-light">
        <ul class="list-group">
          ${reservations
            .map(
              (reservation, index) => `
            <li class="list-group-item">
              <strong>Usuario:</strong> ${reservation.user} | 
              <strong>Alquiler:</strong> ${reservation.fieldType} | 
              <strong>Fecha:</strong> ${reservation.date} | 
              <strong>Hora:</strong> ${reservation.time} | 
              <strong>Estado:</strong> ${reservation.status}
              ${
                reservation.status === "Pendiente"
                  ? `<button onclick="completeReservation(${index})" class="btn btn-success btn-sm ms-2">Completar</button>
                     <button onclick="cancelReservation(${index})" class="btn btn-danger btn-sm ms-2">Cancelar</button>`
                  : ""
              }
            </li>`
            )
            .join("")}
        </ul>
      </form>
    </div>
  `;
}

function completeReservation(index) {
  reservations[index].status = "Completada";
  renderApp();
}

function cancelReservation(index) {
  reservations[index].status = "Cancelada";
  renderApp();
}

