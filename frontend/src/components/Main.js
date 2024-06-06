import React, { Component } from 'react';
import axios from 'axios';
import '../css/Main.css'; // Импортируем созданный CSS файл

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomTextData: [],
            randomText: [],
            inputText: [''],
            keyPressCount: 0,
            loggedEvents: [],
            cursorPosition: 0,
            errorCount: 0,
            startTime: null,
            typingSpeed: 0,
        };
        this.intervalId = null;
    }

    componentDidMount() {
        this.fetchRandomText();
        document.addEventListener('keydown', this.handleKeyDown);
        const startTime = new Date();
        this.setState({ startTime });
        this.intervalId = setInterval(this.updateTypingSpeed, 1000);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    fetchRandomText = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/random-text/');
            if (response.data && response.data.text) {
                this.setState({
                    randomTextData: response.data,
                    randomText: response.data.text.split(' '),
                });
            } else {
                console.error('Response data is not in the expected format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching random text:', error);
        }
    };

    handleKeyDown = (event) => {
        const key = event.key;
        const regex = /^[a-zA-Zа-яА-Я0-9.,?!:;'"()\-]+$/;
        const lastWord = this.state.inputText.length - 1;

        if (key === ' ') {
            if (
                this.state.inputText[lastWord].length >= this.state.randomText[lastWord].length &&
                this.state.inputText[lastWord].length !== 0
            ) {
                this.setState((prevState) => ({
                    inputText: [...prevState.inputText, ''],
                    keyPressCount: prevState.keyPressCount + 1,
                    loggedEvents: [...prevState.loggedEvents, event],
                    cursorPosition: prevState.cursorPosition + 1,
                }));
            }
            return;
        }

        if (
            this.state.inputText[lastWord].length < this.state.randomText[lastWord].length + 5 &&
            key.length === 1 && regex.test(key)
        ) {
            this.setState((prevState) => {
                const inputText = [...prevState.inputText];
                const errorCount = inputText[lastWord].length < this.state.randomText[lastWord].length && key !== this.state.randomText[lastWord][inputText[lastWord].length] ? prevState.errorCount + 1 : prevState.errorCount;
                inputText[lastWord] += key;
                return {
                    inputText,
                    keyPressCount: prevState.keyPressCount + 1,
                    loggedEvents: [...prevState.loggedEvents, event],
                    cursorPosition: prevState.cursorPosition + 1,
                    errorCount: errorCount,
                };
            });
        } else if (key === 'Backspace') {
            this.setState((prevState) => {
                const inputText = [...prevState.inputText];
                if (inputText[lastWord].length === 0 && inputText.length > 1) {
                    inputText.pop();
                } else {
                    inputText[lastWord] = inputText[lastWord].slice(0, -1);
                }
                return {
                    inputText,
                    keyPressCount: prevState.keyPressCount - 1,
                    loggedEvents: [...prevState.loggedEvents, event],
                    cursorPosition: prevState.cursorPosition - 1,
                };
            });
        }
    };

    updateTypingSpeed = () => {
        const { keyPressCount, startTime } = this.state;
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 1000 / 60; // Время в минутах
        const typingSpeed = keyPressCount / elapsedTime; // Скорость печати (символов в минуту)
        this.setState({ typingSpeed });
    };

    calculateAccuracy() {
        const { inputText, randomText, keyPressCount } = this.state;
        let correctCount = 0;

        randomText.forEach((word, wordIndex) => {
            if (inputText[wordIndex]) {
                word.split('').forEach((char, charIndex) => {
                    if (char === inputText[wordIndex][charIndex]) {
                        correctCount++;
                    }
                });
            }
        });

        return (correctCount / keyPressCount) * 100 || 0;
    }

    render() {
        const { keyPressCount, cursorPosition, inputText, errorCount, typingSpeed } = this.state;
        const accuracy = this.calculateAccuracy();

        return (
            <div className="main-container">
                <Statistics
                    keyPressCount={keyPressCount}
                    cursorPosition={cursorPosition}
                    inputText={inputText}
                    errorCount={errorCount}
                    accuracy={accuracy}
                    typingSpeed={typingSpeed}
                />
                <Game
                    randomText={this.state.randomText}
                    inputText={inputText}
                    keyPressCount={keyPressCount}
                    cursorPosition={cursorPosition}
                />
            </div>
        );
    }
}

class Statistics extends Component {
    render() {
        const { keyPressCount, cursorPosition, inputText, errorCount, accuracy, typingSpeed } = this.props;
        return (
            <div className="statistics">
                <p>Key Press Count: {keyPressCount}</p>
                <p>Cursor Position: {cursorPosition}</p>
                <p>Input Text: {inputText.join(' ')}</p>
                <p>Error Count: {errorCount}</p>
                <p>Accuracy: {accuracy.toFixed(2)}%</p>
                <p>Typing Speed: {typingSpeed.toFixed(2)} chars/min</p>
            </div>
        );
    }
}

class Game extends Component {
    getColor = (expectedSymbol, inputSymbol) => {
        if (inputSymbol === '') {
            return 'gray';
        }
        return expectedSymbol === inputSymbol ? 'green' : 'red';
    };

    render() {
        let charCount = 0;
        return (
            <div>
                <p className="main-text">
                    <b>
                        {this.props.randomText.map((word, wordIndex) => {
                            const maxWordLength = Math.max(
                                this.props.randomText[wordIndex]?.length || 0,
                                this.props.inputText[wordIndex]?.length || 0
                            ); // Определяем длину самого длинного слова по индексу
                            return (
                                <span key={wordIndex}>
                                    {Array.from({ length: maxWordLength }).map((_, symbolIndex) => {
                                        const expectedSymbol = word[symbolIndex] || '';  // Существующий символ или пустая строка
                                        const inputWord = this.props.inputText[wordIndex] || '';
                                        const inputSymbol = inputWord[symbolIndex] || '';  // Существующий символ или пустая строка
                                        const color = this.getColor(expectedSymbol, inputSymbol);
                                        const showCursor = charCount === this.props.cursorPosition;
                                        charCount++;
                                        return (
                                            <span key={wordIndex + '-' + symbolIndex} style={{ position: 'relative', color: color }}>
                                                {inputSymbol || expectedSymbol}
                                                {showCursor && <span className="cursor"></span>}
                                            </span>
                                        );
                                    })}
                                    <span style={{ visibility: 'hidden' }}>{charCount++}</span> {/* Учитываем пробел, но не выводим его */}
                                </span>
                            );
                        })}
                    </b>
                </p>
                <p className="main-text">inputedText: {this.props.inputText.join(' ')}</p>
            </div>
        );
    }
}

export default Main;
