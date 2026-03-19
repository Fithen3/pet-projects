// Modal Form

document.addEventListener('DOMContentLoaded', function() {
        // Инициализация Fancybox
        Fancybox.bind('[data-fancybox="contact"]', {
            arrow: false,
            buttons: ['close'],
            keyboard: { Escape: "close" },
        });
        


        
        // Burger Menu

        const burgerToggle = document.getElementById('burgerToggle');
        const navMenu = document.getElementById('navMenu');
        
        burgerToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && e.target !== burgerToggle) {
                burgerToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });


    
        // Swiper для галереи

        if (typeof Swiper !== 'undefined') {
            new Swiper('.portfolio-gallery', {
                freeMode: true,
                mousewheel: {
                    enabled: true,
                    forceToAxis: true
                },
                grabCursor: true,
                resistanceRatio: 0.5,
                slidesPerView: 'auto',
                spaceBetween: 20,
                breakpoints: {
                    768: {
                        spaceBetween: 30
                    }
                }
            });
        }
    });