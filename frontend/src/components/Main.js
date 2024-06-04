import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomTextData: [],
      randomText: [],
      inputText: '',
      keyPressCount: 0,
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
          randomText: response.data.text.split(''),
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
    const regex = /^[ a-zA-Z0-9а-яА-Я.,?!:;'"()\-]+$/;

    if (key.length === 1 && regex.test(key) && this.state.inputText.length < this.state.randomText.length) {
      this.setState((prevState) => ({
        inputText: prevState.inputText + key,
        keyPressCount: prevState.keyPressCount + 1,
      }));
    } else if (key === 'Backspace' && this.state.inputText.length > 0) {
      this.setState((prevState) => ({
        inputText: prevState.inputText.slice(0, -1),
        keyPressCount: prevState.keyPressCount - 1,
      }));
    }
  };

  render() {
    return (
      <div>
        <Game
          randomText={this.state.randomText}
          inputText={this.state.inputText}
          keyPressCount={this.state.keyPressCount}
        />
      </div>
    );
  }
}

class Game extends Component {
  getColor = (symbol, index) => {
    if (index >= this.props.inputText.length) {
      return 'gray';
    }
    return this.props.inputText[index] === symbol ? 'green' : 'red';
  };

  render() {
    return (
      <div>
        <p>
          {this.props.randomText.map((symbol, index) => (
            <span key={index} style={{ color: this.getColor(symbol, index) }}>
              {index < this.props.inputText.length ? this.props.inputText[index] : symbol}
            </span>
          ))}
        </p>
        <p>inputedText: {this.props.inputText}</p>
        <p>Key Press Count: {this.props.keyPressCount}</p>
      </div>
    );
  }
}

export default Main;
