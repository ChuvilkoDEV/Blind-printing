import React, { Component } from 'react';
import '../css/Game.css'; // Подключаем новый CSS файл

class Game extends Component {
    // Определение цвета символа в зависимости от правильности
    getColor = (expectedSymbol, inputSymbol) => {
        if (inputSymbol === '') {
            return 'gray';
        }
        return expectedSymbol === inputSymbol ? 'green' : 'red';
    };

    // Отображение слова с символами
    renderWord = (word, wordIndex, maxWordLength, charCountRef) => {
        return (
            <span key={wordIndex} className="game-word">
                {Array.from({ length: maxWordLength }).map((_, symbolIndex) => {
                    const expectedSymbol = word[symbolIndex] || ''; // Существующий символ или пустая строка
                    const inputWord = this.props.userInput[wordIndex] || '';
                    const inputSymbol = inputWord[symbolIndex] || ''; // Существующий символ или пустая строка
                    const color = this.getColor(expectedSymbol, inputSymbol);
                    const showCursor = charCountRef.current === this.props.cursorPosition;
                    charCountRef.current++;
                    return (
                        <span key={wordIndex + '-' + symbolIndex} style={{ position: 'relative', color: color }}>
                            {inputSymbol || expectedSymbol}
                            {showCursor && <span className="game-cursor"></span>}
                        </span>
                    );
                })}
                <span style={{ visibility: 'hidden' }}>{charCountRef.current++}</span>
            </span>
        );
    };

    render() {
        const charCountRef = { current: 0 };
        return (
            <div className="game-container">
                <p className="game-text">
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
            </div>
        );
    }
}

export default Game;
