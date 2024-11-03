document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuIcon.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuIcon = menuIcon.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMenuIcon && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
        }
    });

    function handleMenuClick(event) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
            }
        }
    }

    const menuLinks = document.querySelectorAll('nav ul li a, .mobile-menu ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });
});

// Obtener el botón
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Mostrar el botón cuando se hace scroll y actualizar el borde
window.onscroll = function () {
    const scrollPercentage = getScrollPercentage();
    
    if (scrollPercentage > 10) { // Mostrar el botón después de 10% de scroll
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }

    // Actualizar el borde del botón en función del porcentaje de scroll
    scrollToTopBtn.style.background = `conic-gradient(orange ${scrollPercentage}%, transparent ${scrollPercentage}%)`;
};

// Obtener el porcentaje de desplazamiento
function getScrollPercentage() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return Math.min((scrollTop / scrollHeight) * 100, 100);
}

// Desplazarse al inicio de la página al hacer clic en el botón
scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});