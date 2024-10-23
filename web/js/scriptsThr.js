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
    const items = document.querySelectorAll('.beneficio-item');
    
    items.forEach(item => {
        item.addEventListener('click', function () {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-soluciones');
    const scrollPosition = window.scrollY;
    const sectionHeight = heroSection.offsetHeight;

    // Calcular el porcentaje de scroll dentro de la sección
    const scrollPercent = scrollPosition / sectionHeight;

    // Cambiar la opacidad de la sección según el scroll (entre 1 y 0)
    if (scrollPercent <= 1) {
        heroSection.style.opacity = 1 - scrollPercent; // La opacidad disminuye a medida que desciendes
    } else {
        heroSection.style.opacity = 0; // Si has desplazado más allá de la sección, opacidad 0
    }
});
