// Функция копирования кода группы
function copyCode() {
    const codeText = document.getElementById('groupCode').innerText;
    
    // Используем Clipboard API
    navigator.clipboard.writeText(codeText).then(() => {
        
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

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