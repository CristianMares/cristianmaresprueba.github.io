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
