(function() {
    'use strict';
    
    // === Элементы ===
    const modal = document.getElementById('tournamentCreateModal');
    const openBtn = document.getElementById('createtournament');
    const cancelBtn = document.getElementById('tournamentModalCancel');
    const submitBtn = document.getElementById('tournamentModalSubmit');
    const form = document.getElementById('tournamentCreateForm');
    
    // === Открытие модального окна ===
    if (openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    function openModal() {
        if (!modal) return;
        
        modal.classList.add('modal-active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Установка минимальной даты (сегодня)
        const dateInput = document.getElementById('tDate');
        if (dateInput) {
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            dateInput.min = now.toISOString().slice(0, 16);
        }
        
        // Фокус на первое поле
        const nameInput = document.getElementById('tName');
        if (nameInput) {
            setTimeout(() => nameInput.focus(), 100);
        }
    }
    
    // === Закрытие модального окна ===
    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('modal-active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
        hideAllErrors();
        form.reset();
    }
    
    // === Закрытие по кнопке отмены ===
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // === Закрытие по клику вне окна ===
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // === Закрытие по Escape ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('modal-active')) {
            closeModal();
        }
    });
    
    // === Обработка отправки формы ===
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных
            const data = {
                name: getValue('tName'),
                format: getValue('tFormat'),
                date: getValue('tDate'),
                maxPlayers: getValue('tMaxPlayers'),
                prize: getValue('tPrize'),
                type: getValue('tType'),
                desc: getValue('tDesc')
            };
            
            // Валидация
            if (!validateData(data)) {
                return;
            }
            
            // Отправка
            submitTournament(data);
        });
    }
    
    // === Вспомогательная функция получения значения ===
    function getValue(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }
    
    // === Валидация данных ===
    function validateData(data) {
        hideAllErrors();
        let isValid = true;
        
        // Название
        if (!data.name || data.name.length < 3) {
            showError('tName', 'Минимум 3 символа');
            isValid = false;
        }
        
        // Формат
        if (!data.format) {
            showError('tFormat', 'Выберите формат');
            isValid = false;
        }
        
        // Дата
        if (!data.date) {
            showError('tDate', 'Выберите дату');
            isValid = false;
        } else {
            const selectedDate = new Date(data.date);
            if (selectedDate < new Date()) {
                showError('tDate', 'Дата не может быть в прошлом');
                isValid = false;
            }
        }
        
        // Участники
        if (!data.maxPlayers || parseInt(data.maxPlayers) < 2) {
            showError('tMaxPlayers', 'Минимум 2 участника');
            isValid = false;
        }
        
        // Призовой фонд
        if (!data.prize || parseInt(data.prize) < 0) {
            showError('tPrize', 'Не может быть отрицательным');
            isValid = false;
        }
        
        return isValid;
    }
    
    // === Показ ошибки ===
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
            input.style.borderColor = 'rgb(153 34 41)';
        }
    }
    
    // === Скрыть все ошибки ===
    function hideAllErrors() {
        const errorSpans = document.querySelectorAll('.error-message');
        errorSpans.forEach(span => {
            span.textContent = '';
            span.style.display = 'none';
        });
        
        const inputs = form?.querySelectorAll('.form-input') || [];
        inputs.forEach(input => {
            input.style.borderColor = 'transparent';
        });
    }
    
    // === Отправка турнира ===
    function submitTournament(data) {
        if (!submitBtn) return;
        
        // Блокировка кнопки
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Обработка...';
        submitBtn.disabled = true;
        
        // Имитация запроса к серверу
        setTimeout(function() {
            console.log('Данные турнира:', data);
            
            // Показываем успех
            submitBtn.textContent = 'Заявка отправлена';
            submitBtn.style.background = 'linear-gradient(to right, rgba(68, 255, 100, 1), rgba(34, 153, 51, 1))';
            
            setTimeout(function() {
                closeModal();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 1500);
            
        }, 1000);
    }
    
    // === Форматирование ввода ===
    // Только цифры для призового фонда
    const prizeInput = document.getElementById('tPrize');
    if (prizeInput) {
        prizeInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Только цифры для участников
    const playersInput = document.getElementById('tMaxPlayers');
    if (playersInput) {
        playersInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Заглавная буква в названии
    const nameInput = document.getElementById('tName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
            }
        });
        
        // Убираем ошибку при вводе
        nameInput.addEventListener('input', function() {
            const errorSpan = this.parentElement.querySelector('.error-message');
            if (errorSpan && this.value.length >= 3) {
                errorSpan.style.display = 'none';
                this.style.borderColor = 'transparent';
            }
        });
    }
    
    // Убираем ошибки при изменении других полей
    ['tFormat', 'tDate', 'tMaxPlayers', 'tPrize', 'tType'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('change', function() {
                const errorSpan = this.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.style.display = 'none';
                    this.style.borderColor = 'transparent';
                }
            });
        }
    });
    
})();