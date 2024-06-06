import React, { Component } from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import Game from './Game';
import '../css/Main.css';

// Главный компонент
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textData: [],          // Данные с текстом, полученные с сервера
            expectedText: [],      // Ожидаемый текст, разбитый на слова
            userInput: [''],       // Ввод пользователя, разбитый на слова
            keyPressCount: 0,      // Количество нажатий клавиш
            keyEvents: [],         // Лог событий нажатия клавиш
            cursorPosition: 0,     // Текущая позиция курсора
            errorCount: 0,         // Количество ошибок
            startTime: null,       // Время начала печати
            typingSpeed: 0,        // Скорость печати (символы в минуту)
            isTypingStarted: false // Флаг, указывающий, начата ли печать
        };
        this.intervalId = null;   // Идентификатор интервала для обновления скорости печати
    }

    componentDidMount() {
        this.fetchTextData();     // Получение текста с сервера при монтировании компонента
        document.addEventListener('keydown', this.handleKeyDown);  // Добавление слушателя событий нажатия клавиш
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);  // Удаление слушателя событий нажатия клавиш
        if (this.intervalId) {
            clearInterval(this.intervalId);  // Очистка интервала при размонтировании компонента
        }
    }

    // Получение текста с сервера
    fetchTextData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/random-text/');
            if (response.data && response.data.text) {
                this.setState({
                    textData: response.data,
                    expectedText: response.data.text.split(' '),
                });
            } else {
                console.error('Response data is not in the expected format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching text data:', error);
        }
    };

    // Обработчик событий нажатия клавиш
    handleKeyDown = (event) => {
        const { key } = event;
        const regex = /^[a-zA-Zа-яА-Я0-9.,?!:;"'()[\]{}-]+$/;
        const lastWordIndex = this.state.userInput.length - 1;

        if (key === 'Backspace') {
            this.handleBackspaceKey(event);
            return;
        }

        if (key === ' ') {
            this.handleSpaceKey(event);
            return;
        }

        if (
            this.state.userInput[lastWordIndex].length < this.state.expectedText[lastWordIndex].length + 5 &&
            key.length === 1 && regex.test(key)
        ) {
            this.handleCharacterKey(key, event);
        }
    };

    // Обработка нажатия клавиши пробела
    handleSpaceKey = (event) => {
        const lastWordIndex = this.state.userInput.length - 1;
        if (
            this.state.userInput[lastWordIndex].length >= this.state.expectedText[lastWordIndex].length &&
            this.state.userInput[lastWordIndex].length !== 0
        ) {
            this.setState((prevState) => ({
                userInput: [...prevState.userInput, ''],
                keyPressCount: prevState.keyPressCount + 1,
                keyEvents: [...prevState.keyEvents, event],
                cursorPosition: prevState.cursorPosition + 1,
            }));
        }
    };

    // Обработка нажатия клавиши Backspace
    handleBackspaceKey = (event) => {
        this.setState((prevState) => {
            const userInput = [...prevState.userInput];
            const lastWordIndex = userInput.length - 1;
            if (userInput[lastWordIndex].length === 0 && userInput.length > 1) {
                userInput.pop();
            } else {
                userInput[lastWordIndex] = userInput[lastWordIndex].slice(0, -1);
            }
            return {
                userInput,
                keyEvents: [...prevState.keyEvents, event],
                cursorPosition: prevState.cursorPosition - 1,
            };
        });
    };

    // Обработка ввода символов
    handleCharacterKey = (key, event) => {
        this.setState((prevState) => {
            const userInput = [...prevState.userInput];
            const lastWordIndex = userInput.length - 1;
            const errorCount =
                userInput[lastWordIndex].length > this.state.expectedText[lastWordIndex].length ||
                    key !== this.state.expectedText[lastWordIndex][userInput[lastWordIndex].length]
                    ? prevState.errorCount + 1
                    : prevState.errorCount;
            userInput[lastWordIndex] += key;

            // Начало отсчета времени и запуска интервала при первом вводе символа
            let { startTime, isTypingStarted } = prevState;
            if (!isTypingStarted) {
                startTime = new Date();
                isTypingStarted = true;
                this.intervalId = setInterval(this.updateTypingSpeed, 1000); // Установка интервала для обновления скорости печати каждую секунду
            }

            return {
                userInput,
                keyPressCount: prevState.keyPressCount + 1,
                keyEvents: [...prevState.keyEvents, event],
                cursorPosition: prevState.cursorPosition + 1,
                errorCount,
                startTime,
                isTypingStarted
            };
        });
    };

    // Обновление скорости печати
    updateTypingSpeed = () => {
        const { keyPressCount, startTime } = this.state;
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 1000 / 60; // Время в минутах
        const typingSpeed = keyPressCount / elapsedTime; // Скорость печати (символы в минуту)
        this.setState({ typingSpeed });
    };

    // Вычисление точности
    calculateAccuracy() {
        const { userInput, expectedText, keyPressCount } = this.state;
        let correctCount = 0;

        expectedText.forEach((word, wordIndex) => {
            if (userInput[wordIndex]) {
                word.split('').forEach((char, charIndex) => {
                    if (char === userInput[wordIndex][charIndex]) {
                        correctCount++;
                    }
                });
            }
        });

        return (correctCount / keyPressCount) * 100 || 0;
    }

    render() {
        const { keyPressCount, cursorPosition, userInput, errorCount, typingSpeed, startTime, isTypingStarted } = this.state;
        const accuracy = this.calculateAccuracy();
        const currentTime = new Date();
        const elapsedTime = isTypingStarted ? Math.floor((currentTime - startTime) / 1000) : 0;

        return (
            <div className="main-container">
                <Statistics
                    keyPressCount={keyPressCount}
                    errorCount={errorCount}
                    elapsedTime={elapsedTime}
                />
                <Game
                    expectedText={this.state.expectedText}
                    userInput={userInput}
                    keyPressCount={keyPressCount}
                    cursorPosition={cursorPosition}
                />
            </div>
        );
    }
}

export default Main;
