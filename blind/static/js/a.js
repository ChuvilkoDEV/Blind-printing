function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function sendRequest(method, url, body = null) {
    const headers = {
		"Content-Type": "application/json", 
		"X-CSRFToken": csrftoken
		};
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(error => {
            const e = new Error("Что-то пошло не так!!!")
            e.data = error
            throw e
        })
    })
}



let startTime; // Переменная для хранения времени начала
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const accuracyElement = document.getElementById('accuracy');
inputField = document.getElementById('inputField');
templateField = document.getElementById("templateField");
const csrftoken = getCookie('csrftoken'); 
let intervalID;
is_started = false;
accuracy = 0;
errors = 0;

// Функция для форматирования времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Функция для форматирования скорости
function formatSpeed(seconds) {
    return `${(accuracy / seconds * 60).toFixed(2)}`;
}

// Функция для форматирования аккуратности
function formatAccuracy() {
return `${accuracy}/${errors} (${(accuracy / (accuracy + errors) * 100).toFixed(2)} %)`;
}

// Функция для начала замера времени
function startTimer() {
	if (!is_started) {
		is_started = true;
		startTime = Date.now(); // Запоминаем время начала
		updateTimer(); // Вызываем функцию обновления времени сразу
		intervalID = setInterval(updateTimer, 1000); // Обновляем каждую секунду
	}
}

// Функция для обновления времени
function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000); // Вычисляем прошедшее время в секундах
    timerElement.textContent = formatTime(currentTime); // Записываем отформатированное время 
	speedElement.textContent = formatSpeed(currentTime);
	accuracyElement.textContent = formatAccuracy(currentTime);
}

function endTimer() {
	data = {
		'accuracy': accuracy,
		'errors': errors,
		'time': Math.floor((Date.now() - startTime) / 1000),
	}
	clearInterval(intervalID);
	sendRequest('POST', 'home\\', data)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Ошибка:', error));
}

// Слушаем событие ввода символа
document.addEventListener("keydown", function (event) {
    let symbol = event.key;
    if (symbol.length === 1 && symbol.match(/[a-zA-Zsа-яА-Я0-9!,. ]/)) {
        event.preventDefault();
		updateTimer();
        if (symbol === templateField.value[0]) {
            startTimer();
            inputField.value += symbol;
            templateField.value = templateField.value.slice(1);
			accuracy += 1
			if (templateField.value.length === 0) {
				endTimer()
			}
        } else {
            inputField.classList.add('shake');
			errors += 1
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
