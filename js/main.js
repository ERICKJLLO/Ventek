const servicesContainer = document.getElementById("services-container");

function mostrarServicios(listaServicios) {
    servicesContainer.innerHTML = "";

    listaServicios.forEach(function(servicio) {
        const card = document.createElement("article");

        card.className = "service-card";

        card.innerHTML = `
            <h3>${servicio.name}</h3>
            <p>${servicio.description}</p>
        `;

        servicesContainer.appendChild(card);
    });
}

mostrarServicios(services);