function renderPrices() {
  const role = sessionStorage.getItem("role");
  const priceList = prices.map(price => `
    <li class="d-flex justify-content-between align-items-center mb-2">
      <span class="fw-bold" style="color: #000000;">${price.courtName}:</span> 
      <span class="fw-normal" style="color: #555555;">$${price.price}</span>
      ${role === "admin" ? `<button class="btn btn-warning btn-sm" onclick="updatePrice(${price.id})">Editar</button>` : ""}
    </li>
  `).join("");

  document.getElementById("app").innerHTML = `
    <div class="container my-5 p-4 rounded" style="background-color: #f8f9fa;">
      <h2 class="text-center fw-bold mb-4" style="color: #000000;">Precios de los alquileres</h2>
      <ul class="list-unstyled">
        ${priceList}
      </ul>
      <div class="text-center mt-4">
        <button class="btn btn-danger" onclick="navigate('dashboard')">Volver</button>
      </div>
    </div>
  `;
}

function updatePrice(courtId) {
  const newPrice = prompt("Ingrese el nuevo precio:");
  if (newPrice) {
    const court = prices.find(p => p.id === courtId);
    if (court) {
      court.price = parseFloat(newPrice);
      renderPrices();
    }
  }
}
