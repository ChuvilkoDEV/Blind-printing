inputField = document.getElementById('inputField');
templateField = document.getElementById("templateField");

// Слушаем событие ввода символа
document.addEventListener("keydown", function (event) {
    let symbol = event.key;
    if (symbol.length === 1 && symbol.match(/[a-zA-Z0-9]/)) {
        event.preventDefault();
        if (symbol === templateField.textContent[0]) {
            inputField.value += symbol;
            templateField.textContent = templateField.textContent.slice(1);
        } else {
            inputField.classList.add('shake');
            setTimeout(function () {
                inputField.classList.remove('shake');
            }, 600);
        }
    } else if (event.key === 'Enter') {
        event.preventDefault();
    }
});
