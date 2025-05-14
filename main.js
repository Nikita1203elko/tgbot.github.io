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
        alert('Данные не отправились почему-то :/, я хз честно как это фиксить'+title+description);
    }
});

// Инициализация WebApp при загрузке
if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand(); // Разворачиваем на весь экран
}
