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
      cursorPosition: 0, // добавляем позицию курсора в состояние
    };
  }

  componentDidMount() {
    this.fetchRandomText();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
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
    const regex = /^[a-zA-Z0-9а-яА-Я.,?!:;'"()\-]+$/;
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
          cursorPosition: prevState.cursorPosition + 1, // обновляем позицию курсора
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
        inputText[lastWord] += key;
        return {
          inputText,
          keyPressCount: prevState.keyPressCount + 1,
          loggedEvents: [...prevState.loggedEvents, event],
          cursorPosition: prevState.cursorPosition + 1, // обновляем позицию курсора
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
          cursorPosition: prevState.cursorPosition - 1, // обновляем позицию курсора
        };
      });
    }
  };

  render() {
    return (
      <div className="main-container">
        <Game
          randomText={this.state.randomText}
          inputText={this.state.inputText}
          keyPressCount={this.state.keyPressCount}
          cursorPosition={this.state.cursorPosition} // передаем позицию курсора
        />
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
    const maxWordLength = Math.max(...this.props.randomText.map(w => w.length)) + 5;
    return (
      <div>
        <p className="main-text">
          <b>
            {this.props.randomText.map((word, wordIndex) => (
              <span key={wordIndex}>
                {
                Array.from({ length: maxWordLength }).map((_, symbolIndex) => {
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
                {' '}
              </span>
            ))}
          </b>
        </p>
        <p className="main-text">inputedText: {this.props.inputText.join(' ')}</p>
        <p>Key Press Count: {this.props.keyPressCount}</p>
      </div>
    );
  }
}

export default Main;
