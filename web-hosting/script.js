// CALCULATOR FUNCTIONALITY
        const storageSlider = document.getElementById('storage');
        const websitesSlider = document.getElementById('websites');
        const backupCheckbox = document.getElementById('backup');
        const priorityCheckbox = document.getElementById('priority');

        storageSlider.addEventListener('input', updateCalculator);
        websitesSlider.addEventListener('input', updateCalculator);

        function updateCalculator() {
            const storage = parseInt(storageSlider.value);
            const websites = parseInt(websitesSlider.value);

            document.getElementById('storage-value').textContent = storage + ' ГБ';
            
            if (websites === 1) {
                document.getElementById('websites-value').textContent = '1 сайт';
            } else if (websites < 5) {
                document.getElementById('websites-value').textContent = websites + ' сайта';
            } else {
                document.getElementById('websites-value').textContent = websites + ' сайтов';
            }

            updatePrice();
        }

        function updatePrice() {
            const storage = parseInt(storageSlider.value);
            const websites = parseInt(websitesSlider.value);
            const backup = backupCheckbox.checked ? 3 : 0;
            const priority = priorityCheckbox.checked ? 5 : 0;

            // Base price calculation
            let basePrice = 9.99;
            
            // Storage pricing
            if (storage > 50) {
                basePrice += (storage - 50) * 0.1;
            }

            // Website pricing
            if (websites > 5) {
                basePrice += (websites - 5) * 1;
            }

            const totalPrice = basePrice + backup + priority;
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        }

        // CONTACT FORM SUBMISSION
        function handleSubmit(event) {
            event.preventDefault();
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            event.target.reset();
        }

        // SMOOTH SCROLLING
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu functionality
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNav = document.querySelector('.mobile-nav');

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Initialize calculator on load
        updateCalculator();