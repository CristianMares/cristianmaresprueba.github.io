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


