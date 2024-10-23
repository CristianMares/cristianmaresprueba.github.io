document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Abrir o cerrar el menú móvil al hacer clic en el icono de menú
    menuIcon.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });

    // Cerrar el menú móvil haciendo clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuIcon = menuIcon.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMenuIcon && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
        }
    });

    // Función para manejar el clic en los enlaces del menú
    function handleMenuClick(event) {
        // No es necesario prevenir el comportamiento predeterminado del enlace, ya que se trata de navegación entre páginas
        // Hacer scroll suave no es necesario, ya que no hay secciones internas

        // Ocultar el menú móvil si está abierto
        if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
        }
    }

    // Obtener todos los elementos de enlace del menú
    const menuLinks = document.querySelectorAll('nav ul li a, .mobile-menu ul li a');

    // Agregar el manejador de eventos a cada enlace del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });
});
