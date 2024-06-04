import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomTextData: [],
      randomText: [],
      inputText: '',
      keyPressCount: 0,  // Добавляем новый state для счетчика нажатий клавиш
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
          randomText: response.data.text.split(''),  // Преобразуем строку в массив символов
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
    var regex = /^[ a-zA-Z0-9а-яА-Я.,?!:;'"()\-]+$/;
    
    if (key.length == 1 && regex.test(key)) {
      this.setState((prevState) => ({
        inputText: prevState.inputText + key,
        keyPressCount: prevState.keyPressCount + 1,  // Увеличиваем счетчик
      }));
    } else if (key === 'Backspace' && this.state.inputText.length > 0) {
      console.log(1)
      this.setState((prevState) => ({
        inputText: prevState.inputText.slice(0, -1),
        keyPressCount: prevState.keyPressCount - 1,  // Увеличиваем счетчик
      }));
    }
  };

  render() {
    return (
      <div>
        <Game
          randomText={this.state.randomText}
          inputText={this.state.inputText}
          keyPressCount={this.state.keyPressCount}  // Передаем счетчик в компонент Game
        />
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div>
        <p>
          {this.props.randomText.map((symbol, index) => (
            <span
              key={index}
              style={{
                color: this.props.inputText[index] === symbol ? 'green' : 'red',
              }}
            >
              {symbol}
            </span>
          ))}
        </p>
        <p>inputedText: {this.props.inputText}</p>
        <p>Key Press Count: {this.props.keyPressCount}</p>  {/* Отображаем счетчик */}
      </div>
    );
  }
}

export default Main;
