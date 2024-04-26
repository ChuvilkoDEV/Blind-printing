// Получаем элемент контейнера блока
const blockContainer = document.getElementById('blockContainer');

// Создаем ссылку как дочерний элемент блока
const link = document.createElement('a');
link.href = 'https://www.example.com'; // Указываем URL ссылки
link.textContent = 'Перейти на страницу'; // Текст ссылки
blockContainer.appendChild(link);