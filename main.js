document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Отправляем данные в Telegram бот
    Telegram.WebApp.sendData(JSON.stringify({
                    title: title,
                    description: description
    }));

        // Закрываем веб-приложение после отправки
    Telegram.WebApp.close();
    });

    // Инициализация WebApp при загрузке
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand(); // Разворачиваем на весь экран
    }
