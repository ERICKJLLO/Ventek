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

const serviceForm = document.getElementById("service-form");
const successModal = document.getElementById("success-modal");
const successModalButton = document.getElementById("success-modal-button");

function limpiarMensajesFormulario() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("service-error").textContent = "";
    document.getElementById("client-type-error").textContent = "";
    document.getElementById("description-error").textContent = "";
    document.getElementById("form-message").textContent = "";
}

serviceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const service = document.getElementById("service");
    const clientType = document.getElementById("client-type");
    const description = document.getElementById("description");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const serviceError = document.getElementById("service-error");
    const clientTypeError = document.getElementById("client-type-error");
    const descriptionError = document.getElementById("description-error");
    const formMessage = document.getElementById("form-message");

    nameError.textContent = "";
    emailError.textContent = "";
    serviceError.textContent = "";
    clientTypeError.textContent = "";
    descriptionError.textContent = "";
    formMessage.textContent = "";

    let formularioValido = true;

    if (name.value.trim().length < 3) {
        nameError.textContent = "El nombre debe tener al menos 3 caracteres.";
        formularioValido = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        emailError.textContent = "Ingresa tu correo electrónico.";
        formularioValido = false;
    } else if (!emailPattern.test(email.value)) {
        emailError.textContent = "Ingresa un correo electrónico válido.";
        formularioValido = false;
    }

    if (service.value === "") {
        serviceError.textContent = "Selecciona un servicio.";
        formularioValido = false;
    }

    if (clientType.value === "") {
        clientTypeError.textContent = "Selecciona el tipo de cliente.";
        formularioValido = false;
    }

    if (description.value.trim().length < 20) {
        descriptionError.textContent = "La descripción debe tener al menos 20 caracteres.";
        formularioValido = false;
    }

    if (formularioValido) {
        fetch(serviceForm.action, {
            method: serviceForm.method,
            body: new FormData(serviceForm),
            headers: {
                Accept: "application/json"
            }
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("No se pudo enviar la solicitud.");
                }

                successModal.hidden = false;
                successModalButton.focus();
            })
            .catch(function() {
                formMessage.textContent = "No se pudo enviar la solicitud. Inténtalo de nuevo.";
            });
    }
});

successModalButton.addEventListener("click", function() {
    successModal.hidden = true;
    serviceForm.reset();
    limpiarMensajesFormulario();
});

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");
const header = document.querySelector("header");

function actualizarEstadoHeader() {
    header.classList.toggle("scrolled", window.scrollY > 80);
}

actualizarEstadoHeader();
window.addEventListener("scroll", actualizarEstadoHeader, { passive: true });

menuButton.addEventListener("click", function() {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuButton.setAttribute("aria-label", "Cerrar menú");
    } else {
        menuButton.setAttribute("aria-label", "Abrir menú");
    }
});

const themeButton = document.getElementById("theme-button");
const savedTheme = localStorage.getItem("ventek-theme");

function actualizarTema(esModoClaro) {
    document.body.classList.toggle("light-mode", esModoClaro);
    themeButton.textContent = esModoClaro ? "🌙" : "☀️";
    themeButton.setAttribute(
        "aria-label",
        esModoClaro ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
    );
}

actualizarTema(savedTheme === "light");

themeButton.addEventListener("click", function() {
    const esModoClaro = !document.body.classList.contains("light-mode");

    actualizarTema(esModoClaro);
    localStorage.setItem("ventek-theme", esModoClaro ? "light" : "dark");
});