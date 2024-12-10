document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
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
