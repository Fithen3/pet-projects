document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.cardtournament');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Убираем класс active у всех кнопок и добавляем нажатой
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Получаем значение фильтра из data-атрибута
            const filterValue = button.getAttribute('data-filter');

            // 3. Проходим по всем карточкам
            cards.forEach(card => {
                // Сбрасываем скрытие
                card.classList.remove('hidden');

                if (filterValue === 'popular') {
                    // Если фильтр "Популярные", скрываем те, у которых нет data-popular="true"
                    if (card.getAttribute('data-popular') !== 'true') {
                        card.classList.add('hidden');
                    }
                } 
                else if (filterValue === 'my') {
                    // Если фильтр "Ваши", скрываем те, у которых нет data-my="true"
                    if (card.getAttribute('data-my') !== 'true') {
                        card.classList.add('hidden');
                    }
                }
                // Если filterValue === 'all', мы ничего не скрываем (показываем все)
            });
        });
    });
});