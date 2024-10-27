document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.beneficio-item');
    
    items.forEach(item => {
        item.addEventListener('click', function () {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

window.addEventListener("scroll", function () {
    const heroSection = document.querySelector(".hero-soluciones");
    const scrollPosition = window.scrollY;
    const fadeOutPoint = 500; // Cambiamos el punto de desvanecimiento a 300 para que desaparezca antes de alcanzar el gris.

    // Calcula la opacidad en función de la posición de desplazamiento
    let opacity = 1 - (scrollPosition / fadeOutPoint);

    // Limita la opacidad para evitar valores negativos
    opacity = Math.max(opacity, 0);

    // Aplica la opacidad de la sección
    heroSection.style.opacity = opacity;

    // Cambia el fondo de la sección cuando la opacidad se aproxima a 0
    if (opacity < 0.1) { 
        heroSection.style.backgroundColor = "#f4f4f4"; // Aplica el color de fondo antes de que la opacidad llegue a 0
    } else {
        heroSection.style.backgroundColor = "transparent";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const beneficioSection = document.querySelector('.beneficios-slider');
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
                beneficioSection.style.transform = 'scale(1) translateZ(0)';
                beneficioSection.style.opacity = '1';

                // Una vez realizada la primera animación, cambia el control y continúa con la lógica de desplazamiento
                firstTimeVisible = false;
            } else {
                // Lógica de desplazamiento después de la primera aparición
                if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight) {
                    // Cuando la parte superior de "Beneficios" entra a la vista y estamos bajando
                    if (isScrollingDown) {
                        beneficioSection.style.transform = 'translateZ(0px) scale(1)';
                        beneficioSection.style.opacity = 1;
                    }
                } else if (!entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight) {
                    // Cuando la parte superior de "Beneficios" sale de la vista y estamos subiendo
                    if (!isScrollingDown) {
                        beneficioSection.style.transform = 'translateZ(-400px) scale(0.7)';
                        beneficioSection.style.opacity = 0.3;
                    }
                }
            }
        });
    }, observerOptions);

    // Inicia la observación de la sección de beneficios
    observer.observe(beneficioSection);
});

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.section-imagen img');

    // Opciones de observador de intersección
    const observerOptions = {
        root: null,           // La ventana de visualización actual
        threshold: 0.1        // El 10% de la imagen debe ser visible para activar la animación
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Activar la animación cuando la imagen entra en vista
                img.style.transform = 'translateX(0)';
                img.style.opacity = '1';
                // Detener la observación una vez animada, o comenta esta línea si deseas que se repita cada vez
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    // Aplicar el observador a cada imagen de la sección
    images.forEach(img => {
        // Configuración inicial antes de la animación
        img.style.opacity = '0';
        img.style.transform = img.closest('.section-imagen').classList.contains('left') 
            ? 'translateX(-50px)' // Desplaza la imagen desde la izquierda
            : 'translateX(50px)'; // Desplaza la imagen desde la derecha

        observer.observe(img);
    });
});
