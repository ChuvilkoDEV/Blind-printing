import React, { Component } from 'react';
import axios from 'axios';
import '../css/Main.css'; // Импортируем созданный CSS файл

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomTextData: [],
      randomText: [],
      inputedText: [''],
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
    const lastWord = this.state.inputedText.length - 1;

    if (key === ' ') {
      if (
        this.state.inputedText[lastWord].length >= this.state.randomText[lastWord].length &&
        this.state.inputedText[lastWord].length !== 0
      ) {
        this.setState((prevState) => ({
          inputedText: [...prevState.inputedText, ''],
          keyPressCount: prevState.keyPressCount + 1,
          loggedEvents: [...prevState.loggedEvents, event],
          cursorPosition: prevState.cursorPosition + 1, // обновляем позицию курсора
        }));
      }
      return;
    }

    if (
      this.state.inputedText[lastWord].length < this.state.randomText[lastWord].length + 5 &&
      key.length === 1 && regex.test(key)
    ) {
      this.setState((prevState) => {
        const inputedText = [...prevState.inputedText];
        inputedText[lastWord] += key;
        return {
          inputedText,
          keyPressCount: prevState.keyPressCount + 1,
          loggedEvents: [...prevState.loggedEvents, event],
          cursorPosition: prevState.cursorPosition + 1, // обновляем позицию курсора
        };
      });
    } else if (key === 'Backspace') {
      this.setState((prevState) => {
        const inputedText = [...prevState.inputedText];
        if (inputedText[lastWord].length === 0 && inputedText.length > 1) {
          inputedText.pop();
        } else {
          inputedText[lastWord] = inputedText[lastWord].slice(0, -1);
        }
        return {
          inputedText,
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
          inputedText={this.state.inputedText}
          keyPressCount={this.state.keyPressCount}
          cursorPosition={this.state.cursorPosition} // передаем позицию курсора
        />
      </div>
    );
  }
}

class Game extends Component {
  getColor = (symbol, wordIndex, symbolIndex) => {
    if (
      wordIndex >= this.props.inputedText.length ||
      symbolIndex >= this.props.inputedText[wordIndex].length
    ) {
      return 'gray';
    }
    return this.props.inputedText[wordIndex][symbolIndex] === symbol ? 'green' : 'red';
  };

  render() {
    let charCount = 0;
    return (
      <div>
        <p className="main-text">
          <b>
            {this.props.randomText.map((word, wordIndex) => (
              <span key={wordIndex}>
                {word.split('').map((symbol, symbolIndex) => {
                  const color = this.getColor(symbol, wordIndex, symbolIndex);
                  const showCursor = charCount === this.props.cursorPosition;
                  charCount++;
                  return (
                    <span key={wordIndex + '-' + symbolIndex} style={{ position: 'relative', color: color }}>
                      {symbol}
                      {showCursor && <span className="cursor"></span>}
                    </span>
                  );
                })}
                {' '}
              </span>
            ))}
          </b>
        </p>
        <p className="main-text">inputedText: {this.props.inputedText.join(' ')}</p>
        <p>Key Press Count: {this.props.keyPressCount}</p>
      </div>
    );
  }
}

export default Main;
