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

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const filter = button.dataset.filter;

        if (filter === "todos") {
            mostrarServicios(services);
        } else {
            const serviciosFiltrados = services.filter(function(servicio) {
                return servicio.category === filter;
            });

            mostrarServicios(serviciosFiltrados);
        }

        filterButtons.forEach(function(boton) {
            boton.classList.remove("active");
        });

        button.classList.add("active");
    });
});