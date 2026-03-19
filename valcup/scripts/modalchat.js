document.addEventListener('DOMContentLoaded', function () {
      var openBtn = document.getElementById('openModalBtn');
      var closeBtn = document.getElementById('closeModalBtn');
      var submitBtn = document.getElementById('submitModalBtn');
      var overlay = document.getElementById('modalOverlay');
      var modalWindow = document.getElementById('modalWindow');

      function openModal() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
          overlay.classList.add('modal-active');
        });
      }

      function closeModal() {
        overlay.classList.remove('modal-active');
        overlay.addEventListener('transitionend', function handler() {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
          overlay.removeEventListener('transitionend', handler);
        });
      }

      openBtn.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      submitBtn.addEventListener('click', closeModal);

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          closeModal();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
          closeModal();
        }
      });
    });

// Функция отправки сообщения в чат
function sendMessage() {
    const input = document.getElementById('chatInput');
    const messageText = input.value.trim();
    const chatWindow = document.getElementById('chatWindow');

    if (messageText !== "") {
        // Создаем элементы сообщения
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message sent'; // Добавляем класс 'sent' для своих сообщений

        const msgHeader = document.createElement('div');
        msgHeader.className = 'msg-header';
        msgHeader.innerText = 'Капитан хост (ВЫ)';

        const msgContent = document.createElement('div');
        msgContent.className = 'msg-content';
        msgContent.innerText = messageText;

        // Собираем сообщение
        msgDiv.appendChild(msgHeader);
        msgDiv.appendChild(msgContent);

        // Добавляем в чат
        chatWindow.appendChild(msgDiv);

        // Очищаем поле ввода
        input.value = "";

        // Прокрутка вниз к новому сообщению
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// Отправка по нажатию Enter
document.getElementById('chatInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});