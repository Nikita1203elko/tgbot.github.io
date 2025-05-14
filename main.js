// Отладочная информация
console.log("UserAgent:", navigator.userAgent);
console.log("Telegram object:", window.Telegram);
console.log("WebApp object:", window.Telegram?.WebApp);

// Ждём полной загрузки
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticketForm');
    
    // Проверяем WebApp
    if (isTelegramWebApp()) {
        initTelegramWebApp();
    } else {
        console.warn("Это не Telegram WebView!");
        initFallback();
    }

    form.addEventListener('submit', handleSubmit);
});

function isTelegramWebApp() {
    return !!window.Telegram?.WebApp?.initData;
}

function initTelegramWebApp() {
    console.log("Инициализация WebApp...");
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    console.log("WebApp version:", Telegram.WebApp.version);
}

function initFallback() {
    console.log("Режим браузера");
    // Здесь можно добавить альтернативную логику
}

function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    };

    if (isTelegramWebApp()) {
        Telegram.WebApp.sendData(JSON.stringify(data));
        Telegram.WebApp.close();
    } else {
        alert(`Данные (WebApp недоступен):\n${data.title}\n${data.description}`);
    }




document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    // Отправляем данные в Telegram бот
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.sendData(JSON.stringify({
            title: title,
            description: description
        }));
        
        // Закрываем веб-приложение после отправки
        Telegram.WebApp.close();
    } else {
        alert('Данные не отправились почему-то :/, я хз честно как это фиксить'+'\nДанные тикета:\nНазвание: ' + title + '\nОписание: ' + description);
    }
});

// Инициализация WebApp при загрузке
if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand(); // Разворачиваем на весь экран
}
