function navigate(component) {
  const app = document.getElementById("app");

  switch (component) {
    case "dashboard":
      app.innerHTML = dashboardComp();
      break;
    case "users":
      if (sessionStorage.getItem("role") === "admin") {
        app.innerHTML = userComponent();
      } else {
        alert("Usted no teine permiso.");
      }
      break;
    case "rental":
      app.innerHTML = rentalComp();
      break;
    case "rentalTotal":
      app.innerHTML = rentalTotalComp();
      break;
    case "support":
      app.innerHTML = supportComp();
      break;
    default:
      app.innerHTML = showLoginForm();
      break;
  }
}

renderApp();




function renderApp() {
  const role = sessionStorage.getItem("role");
  if (role) {
    navigate("dashboard");
  } else {
    navigate();
  }
}

renderApp();

const reservations = [
  { id: 1, fieldType: "Alquiler Combo Parlante chico", userId: 2, date: "2024-10-01", time: "10:00", status: "Pendiente" },
  { id: 2, fieldType: "Alquiler Combo Parlante mediano", userId: 1, date: "2024-11-01", time: "12:00", status: "Cancelada" },
  { id: 3, fieldType: "Alquiler Combo Parlante grande", userId: 2, date: "2024-08-15", time: "09:00", status: "Pendiente" },
  { id: 4, fieldType: "Combo Luces chico", userId: 1, date: "2024-09-10", time: "14:00", status: "Cancelada" },
  { id: 4, fieldType: "Combo Luces mediano", userId: 1, date: "2024-10-10", time: "22:00", status: "Pendiente" }
];

const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "user", password: "123", role: "user" },
];

let prices = [
  { id: 1, courtName: "Alquiler Combo Parlante chico", price: 75000 },
  { id: 2, courtName: "Alquiler Combo Parlante mediano", price: 100000 },
  { id: 3, courtName: "Alquiler Combo Parlante grande", price: 125000 },
  { id: 4, courtName: "Combo Luces chico", price: 23000 },
  { id: 5, courtName: "Combo Luces mediano", price: 35000 },
];
