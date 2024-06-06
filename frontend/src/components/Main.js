import React, { Component } from 'react';
import axios from 'axios';
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
        };
        this.intervalId = null;   // Идентификатор интервала для обновления скорости печати
    }

    componentDidMount() {
        this.fetchTextData();     // Получение текста с сервера при монтировании компонента
        document.addEventListener('keydown', this.handleKeyDown);  // Добавление слушателя событий нажатия клавиш
        const startTime = new Date();  // Установка времени начала
        this.setState({ startTime });
        this.intervalId = setInterval(this.updateTypingSpeed, 1000);  // Установка интервала для обновления скорости печати каждую секунду
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
            return {
                userInput,
                keyPressCount: prevState.keyPressCount + 1,
                keyEvents: [...prevState.keyEvents, event],
                cursorPosition: prevState.cursorPosition + 1,
                errorCount,
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
        const { keyPressCount, cursorPosition, userInput, errorCount, typingSpeed } = this.state;
        const accuracy = this.calculateAccuracy();

        return (
            <div className="main-container">
                <Statistics
                    keyPressCount={keyPressCount}
                    cursorPosition={cursorPosition}
                    userInput={userInput}
                    errorCount={errorCount}
                    accuracy={accuracy}
                    typingSpeed={typingSpeed}
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

// Компонент для отображения статистики
class Statistics extends Component {
    render() {
        const { keyPressCount, cursorPosition, userInput, errorCount, accuracy, typingSpeed } = this.props;
        return (
            <div className="statistics">
                <p>Key Press Count: {keyPressCount}</p>
                <p>Cursor Position: {cursorPosition}</p>
                <p>User Input: {userInput.join(' ')}</p>
                <p>Error Count: {errorCount}</p>
                <p>Accuracy: {accuracy.toFixed(2)}%</p>
                <p>Typing Speed: {typingSpeed.toFixed(2)} chars/min</p>
            </div>
        );
    }
}

// Компонент для отображения игры
class Game extends Component {
    // Определение цвета символа (правильный/неправильный/не введен)
    getColor = (expectedSymbol, inputSymbol) => {
        if (inputSymbol === '') {
            return 'gray';
        }
        return expectedSymbol === inputSymbol ? 'green' : 'red';
    };

    // Отображение слова с подсветкой символов
    renderWord = (word, wordIndex, maxWordLength, charCountRef) => {
        return (
            <span key={wordIndex}>
                {Array.from({ length: maxWordLength }).map((_, symbolIndex) => {
                    const expectedSymbol = word[symbolIndex] || '';  // Существующий символ или пустая строка
                    const inputWord = this.props.userInput[wordIndex] || '';
                    const inputSymbol = inputWord[symbolIndex] || '';  // Существующий символ или пустая строка
                    const color = this.getColor(expectedSymbol, inputSymbol);
                    const showCursor = charCountRef.current === this.props.cursorPosition;
                    charCountRef.current++;
                    return (
                        <span key={wordIndex + '-' + symbolIndex} style={{ position: 'relative', color: color }}>
                            {inputSymbol || expectedSymbol}
                            {showCursor && <span className="cursor"></span>}
                        </span>
                    );
                })}
                <span style={{ visibility: 'hidden' }}>{charCountRef.current++}</span>
            </span>
        );
    }

    render() {
        const charCountRef = { current: 0 };
        return (
            <div>
                <p className="main-text">
                    <b>
                        {this.props.expectedText.map((word, wordIndex) => {
                            const maxWordLength = Math.max(
                                this.props.expectedText[wordIndex]?.length || 0,
                                this.props.userInput[wordIndex]?.length || 0
                            ); // Определение длины самого длинного слова по индексу
                            return this.renderWord(word, wordIndex, maxWordLength, charCountRef);
                        })}
                    </b>
                </p>
                <p className="main-text">User Input: {this.props.userInput.join(' ')}</p>
            </div>
        );
    }
}

export default Main;
