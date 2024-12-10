let slideIndex = 0;
// Función para mostrar las diapositivas
function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");

    // Verificar si n es mayor o igual a la cantidad de diapositivas
    if (n >= slides.length) {
        slideIndex = 0;
    }

    // Verificar si n es menor que 0
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Ocultar todas las diapositivas
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Mostrar la diapositiva actual
    slides[slideIndex].style.display = "block";
}

// Función para avanzar o retroceder las diapositivas
function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Mostrar la primera diapositiva al cargar la página
showSlides(slideIndex);

// Cambiar de diapositiva automáticamente cada 5 segundos
setInterval(function () {
    plusSlides(1);
}, 5000);

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon'); // Selecciona el icono del menú móvil
    const mobileMenu = document.querySelector('.mobile-menu'); // Selecciona el menú móvil
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown'); // Selecciona todos los submenús de primer nivel
    const mobileSubDropdowns = document.querySelectorAll('.mobile-sub-dropdown'); // Selecciona todos los sub-submenús

    // Función para resetear todos los submenús y sub-submenús
    function resetMenuState() {
        mobileDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownContent = dropdown.querySelector('.mobile-dropdown-content');
            if (dropdownContent) {
                dropdownContent.classList.remove('active');
            }

            // Cerrar todos los sub-submenús dentro de este submenú
            const subDropdowns = dropdown.querySelectorAll('.mobile-sub-dropdown');
            subDropdowns.forEach(subDropdown => {
                subDropdown.classList.remove('active');
                const subDropdownContent = subDropdown.querySelector('.mobile-sub-dropdown-content');
                if (subDropdownContent) {
                    subDropdownContent.classList.remove('active');
                }
            });
        });
    }

    // Abrir o cerrar el menú móvil al hacer clic en el icono de menú
    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show'); // Alterna la visibilidad del menú móvil

        // Si se cierra la barra de navegación, resetear todos los menús
        if (!mobileMenu.classList.contains('show')) {
            resetMenuState();
        }
    });

    // Cerrar el menú móvil, submenús y sub-submenús al hacer clic fuera de él
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuIcon = menuIcon.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMenuIcon && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            resetMenuState(); // Resetear todos los menús cuando se cierre la barra de navegación
        }
    });

    // Función para manejar el clic en los enlaces del menú (aplicable a la barra de navegación principal y al menú móvil)
    function handleMenuClick(event) {
        const targetId = this.getAttribute('href'); // Obtener el valor del href
        if (targetId.startsWith('#')) { // Solo aplicar desplazamiento suave para enlaces internos (anclas)
            event.preventDefault(); // Prevenir el comportamiento predeterminado de los enlaces

            const targetElement = document.getElementById(targetId.substring(1)); // Seleccionar el elemento de destino

            if (targetElement) { // Asegurarse de que el destino existe
                const headerHeight = document.querySelector('header').offsetHeight; // Obtener la altura del header
                const offsetPosition = targetElement.offsetTop - headerHeight; // Calcular la posición de desplazamiento

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Desplazamiento suave hacia la posición de destino
                });
            }

            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                resetMenuState(); // Resetear todos los menús cuando se cierre la barra de navegación
            }
        }
    }

    // Agregar la funcionalidad a los enlaces de la barra de navegación principal
    const navLinks = document.querySelectorAll('nav ul li a'); // Selecciona todos los enlaces de la barra de navegación principal
    navLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick); // Agrega el evento de clic a cada enlace en la barra de navegación principal
    });

    // Agregar la funcionalidad a los enlaces del menú móvil
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a'); // Selecciona todos los enlaces del menú móvil
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick); // Agrega el evento de clic a cada enlace en el menú móvil
    });

    const mobileDropdownArrows = document.querySelectorAll('.mobile-dropdown > .arrow'); // Selecciona las flechas de los submenús
    const mobileSubDropdownArrows = document.querySelectorAll('.mobile-sub-dropdown > .arrow'); // Selecciona las flechas de los sub-submenús

    // Manejar el clic en las flechas de primer nivel (Servicios)
    mobileDropdownArrows.forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir la propagación del evento
            const parent = this.parentElement;
            const currentlyActiveDropdown = document.querySelector('.mobile-dropdown.active');

            // Cerrar el submenú actualmente activo si es diferente al seleccionado
            if (currentlyActiveDropdown && currentlyActiveDropdown !== parent) {
                currentlyActiveDropdown.classList.remove('active');
                const currentlyActiveDropdownContent = currentlyActiveDropdown.querySelector('.mobile-dropdown-content');
                if (currentlyActiveDropdownContent) {
                    currentlyActiveDropdownContent.classList.remove('active');
                }

                // Cerrar todos los sub-submenús dentro del submenú que se va a cerrar
                const subDropdowns = currentlyActiveDropdown.querySelectorAll('.mobile-sub-dropdown');
                subDropdowns.forEach(subDropdown => {
                    subDropdown.classList.remove('active');
                    const subDropdownContent = subDropdown.querySelector('.mobile-sub-dropdown-content');
                    if (subDropdownContent) {
                        subDropdownContent.classList.remove('active');
                    }
                });
            }

            // Alternar la clase 'active' en el submenú seleccionado
            parent.classList.toggle('active');
            parent.querySelector('.mobile-dropdown-content').classList.toggle('active');

            // Si el submenú se cierra, también cerrar todos sus sub-submenús
            if (!parent.classList.contains('active')) {
                const subDropdowns = parent.querySelectorAll('.mobile-sub-dropdown');
                subDropdowns.forEach(subDropdown => {
                    subDropdown.classList.remove('active');
                    const subDropdownContent = subDropdown.querySelector('.mobile-sub-dropdown-content');
                    if (subDropdownContent) {
                        subDropdownContent.classList.remove('active');
                    }
                });
            }
        });
    });

    // Manejar el clic en las flechas de segundo nivel (Área de TI)
    mobileSubDropdownArrows.forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir la propagación del evento
            const parent = this.parentElement;
            const currentlyActiveSubDropdown = parent.parentElement.querySelector('.mobile-sub-dropdown.active');

            // Cerrar el sub-submenú actualmente activo si es diferente al seleccionado
            if (currentlyActiveSubDropdown && currentlyActiveSubDropdown !== parent) {
                currentlyActiveSubDropdown.classList.remove('active');
                const currentlyActiveSubDropdownContent = currentlyActiveSubDropdown.querySelector('.mobile-sub-dropdown-content');
                if (currentlyActiveSubDropdownContent) {
                    currentlyActiveSubDropdownContent.classList.remove('active');
                }
            }

            // Alternar la clase 'active' en el sub-submenú seleccionado
            parent.classList.toggle('active');
            parent.querySelector('.mobile-sub-dropdown-content').classList.toggle('active');
        });
    });

    // Prevenir el cierre del submenú de primer nivel al hacer clic en un sub-submenú
    document.querySelectorAll('.mobile-dropdown, .mobile-sub-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir la propagación del evento para evitar el cierre inesperado del menú
        });
    });

});

// Resetea todos los formularios en la página al recargar
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset(); // Resetea cada formulario al recargar la página
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown'); // Menú principal "Servicios"
    const dropdownContent = dropdown.querySelector('.dropdown-content'); // Submenú de "Servicios"
    const subDropdowns = document.querySelectorAll('.sub-dropdown'); // Submenús (Ej: Soluciones de Software)

    // Función para cerrar todos los submenús activos
    function closeAllSubDropdowns() {
        subDropdowns.forEach(subDropdown => {
            const subDropdownContent = subDropdown.querySelector('.sub-dropdown-content');
            if (subDropdownContent) {
                subDropdownContent.style.display = 'none';
                subDropdown.classList.remove('active');
            }
        });
    }

    // Evento para abrir/cerrar el submenú principal de "Servicios"
    dropdown.addEventListener('mouseenter', function () {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', function () {
        dropdownContent.style.display = 'none';
        closeAllSubDropdowns(); // Cierra cualquier submenú activo al salir del menú principal
    });

    // Manejar el clic en las flechas de cada submenú (ej. "Soluciones de Software")
    subDropdowns.forEach(subDropdown => {
        const arrow = subDropdown.querySelector('.arrow');

        if (arrow) {
            arrow.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevenir que el clic se propague y cierre el menú completo
                const subDropdownContent = subDropdown.querySelector('.sub-dropdown-content');

                // Alternar la visibilidad del submenú
                if (subDropdownContent.style.display === 'block') {
                    subDropdownContent.style.display = 'none';
                    subDropdown.classList.remove('active');
                } else {
                    closeAllSubDropdowns(); // Cierra otros submenús abiertos
                    subDropdownContent.style.display = 'block';
                    subDropdown.classList.add('active');
                }
            });
        }
    });

    // Cerrar todos los menús si se hace clic fuera
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.style.display = 'none';
            closeAllSubDropdowns();
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const servicioSection = document.querySelector('.servicios-slider');
    let firstTimeVisible = true; // Control para la primera aparición de la sección

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null,
        threshold: 0.1 // Detectar cuando el 10% de la sección esté visible
    };

    let previousScrollY = window.scrollY; // Guardar la posición de scroll anterior para detectar dirección de scroll

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isScrollingDown = window.scrollY > previousScrollY;
            previousScrollY = window.scrollY;

            if (firstTimeVisible && entry.isIntersecting) {
                // Primer efecto cuando se ve la sección por primera vez
                servicioSection.style.transform = 'scale(1) translateZ(0)';
                servicioSection.style.opacity = '1';

                // Una vez realizada la primera animación, cambia el control y continúa con la lógica de desplazamiento
                firstTimeVisible = false;
            } else {
                // Lógica de desplazamiento después de la primera aparición
                if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight) {
                    // Cuando la parte superior de "Servicios" entra a la vista y estamos bajando
                    if (isScrollingDown) {
                        servicioSection.style.transform = 'translateZ(0px) scale(1)';
                        servicioSection.style.opacity = 1;
                    }
                } else if (!entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight) {
                    // Cuando la parte superior de "Servicios" sale de la vista y estamos subiendo
                    if (!isScrollingDown) {
                        servicioSection.style.transform = 'translateZ(-400px) scale(0.7)';
                        servicioSection.style.opacity = 0.3;
                    }
                }
            }
        });
    }, observerOptions);

    // Inicia la observación de la sección de servicios
    observer.observe(servicioSection);
});
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.servicio-item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            // Elimina la clase 'active' de todos los servicios
            items.forEach(i => i.classList.remove('active'));
            // Agrega la clase 'active' solo al elemento clicado
            this.classList.add('active');
        });
    });
});
const globalScrollThreshold = window.innerHeight * 0.1; // 10% de la altura de la ventana

const header = document.querySelector('header');
const logo = document.querySelector('.logo');
const logoText = document.querySelector('.logo-text');
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener('scroll', scrollHandler);

function scrollHandler() {
    const scrollY = window.scrollY;
    const scrollPercentage = getScrollPercentage();

    // Cambiar tamaño del header
    if (scrollY > globalScrollThreshold) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }

    // Mostrar el botón "Volver al inicio" y actualizar su borde
    if (scrollY > globalScrollThreshold) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }

    // Actualizar el borde del botón en función del porcentaje de scroll
    scrollToTopBtn.style.background = `conic-gradient(orange ${scrollPercentage}%, transparent ${scrollPercentage}%)`;

    // Cambiar entre logo y texto en el header
    if (scrollY > globalScrollThreshold) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.95)';
        logoText.style.opacity = '1';
        logoText.style.transform = 'translate(-50%, -50%) scale(1)';
    } else {
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
        logoText.style.opacity = '0';
        logoText.style.transform = 'translate(-50%, -50%) scale(0.95)';
    }
}

// Obtener el porcentaje de desplazamiento
function getScrollPercentage() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return Math.min((scrollTop / scrollHeight) * 100, 100);
}

// Desplazarse al inicio de la página al hacer clic en el botón
scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({top: 0, behavior: "smooth"});
});
