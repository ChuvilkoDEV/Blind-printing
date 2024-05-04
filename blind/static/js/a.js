inputField = document.getElementById('inputField');
templateField = document.getElementById("templateField");

// Слушаем событие ввода символа
document.addEventListener("keydown", function (event) {
    let symbol = event.key;
    if (symbol.length === 1 && symbol.match(/[a-zA-Zsа-яА-Я0-9,. ]/)) {
        event.preventDefault();
        if (symbol === templateField.value[0]) {
            inputField.value += symbol;
            templateField.value = templateField.value.slice(1);
        } else {
            inputField.classList.add('shake');
            setTimeout(function () {
                inputField.classList.remove('shake');
            }, 600);
        }
    } else if (symbol === 'Enter') {
        event.preventDefault();
    }
});

const dataToSend = {
  key1: 'value1',
  key2: 'value2'
};
