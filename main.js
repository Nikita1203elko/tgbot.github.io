// Проверка, что мы в Telegram WebView
function isTelegramWebApp() {
    // Способ 1: Проверка userAgent
    const isTelegram = /Telegram|WebApp/i.test(navigator.userAgent);
    
    // Способ 2: Проверка объекта Telegram.WebApp
    const hasWebApp = !!window.Telegram?.WebApp?.initData;
    
    return isTelegram || hasWebApp;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticketForm');
    
    if (isTelegramWebApp()) {
        console.log("Режим Telegram WebApp");
        initTelegramWebApp();
    } else {
        console.log("Режим обычного браузера");
        initFallbackMode();
    }

    form.addEventListener('submit', handleFormSubmit);
});

function initTelegramWebApp() {
    try {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        console.log("WebApp инициализирован", {
            version: Telegram.WebApp.version,
            platform: Telegram.WebApp.platform
        });
    } catch (e) {
        console.error("Ошибка инициализации WebApp:", e);
    }
}

function initFallbackMode() {
    // Стили или логика для обычного браузера
    document.body.classList.add('browser-mode');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    };

    if (isTelegramWebApp()) {
        try {
            Telegram.WebApp.sendData(JSON.stringify(data));
            Telegram.WebApp.close();
        } catch (error) {
            console.error("Ошибка отправки:", error);
            showFallbackMessage(data);
        }
    } else {
        showFallbackMessage(data);
    }
}

function showFallbackMessage(data) {
    alert(`Тикет создан (режим браузера):\nНазвание: ${data.title}\nОписание: ${data.description}`);
    // Здесь можно добавить отправку через fetch/email/etc
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
