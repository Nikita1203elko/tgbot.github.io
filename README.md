<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тикет | Ticket</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div class="container">
        <h1>Создание тикета</h1>
        <form id="ticketForm">
            <div class="form-group">
                <input type="text" id="title" class="input-field" placeholder=" " required>
                <label for="title" class="floating-label">Название тикета</label>
            </div>
            
            <div class="form-group">
                <textarea id="description" class="input-field" placeholder=" " required></textarea>
                <label for="description" class="floating-label">Описание тикета</label>
            </div>
            
            <button type="submit" class="submit-btn">Создать тикет</button>
        </form>
    </div>
    <script src="main.js" type="text/javascript"></script>
</body>
</html>
