import React, {Component} from 'react';
import axios from 'axios';
import '../css/Main.css'; // Import the created CSS file

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomTextData: [],
      randomText: [],
      inputText: [''],
      keyPressCount: 0,
      loggedEvents: [],
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

    if (key === ' ') {
      if (this.state.inputText[-1].length !== 0) {
        this.setState((prevState) => ({
          inputText: prevState.inputText.push(''),
          keyPressCount: prevState.keyPressCount + 1,
          loggedEvents: [...prevState.loggedEvents, event],
        }));
      }
      return;
    }
    
    if (key.length === 1 && regex.test(key) && this.state.inputText.length < this.state.randomText.join(' ').length) {
      this.setState((prevState) => ({
        inputText: prevState.inputText[-1] + key,
        keyPressCount: prevState.keyPressCount + 1,
        loggedEvents: [...prevState.loggedEvents, event],
      }));
    } else if (key === 'Backspace' && this.state.inputText.length > 0) {
      this.setState((prevState) => ({
        inputText: prevState.inputText.slice(0, -1),
        keyPressCount: prevState.keyPressCount - 1,
        loggedEvents: [...prevState.loggedEvents, event],
      }));
    }
  };

  render() {
    return (
      <div className="main-container">
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
  getColor = (symbol, wordIndex, symbolIndex) => {
    if (wordIndex >= this.props.inputText.length || symbolIndex >= this.props.inputText[wordIndex].length) {
      return 'gray';
    }
    return this.props.inputText[wordIndex][symbolIndex] === symbol ? 'green' : 'red';
  };

  render() {
    return (
      <div>
        <p className="main-text"><b>
          {this.props.randomText.map((word, wordIndex) => (
            <span key={wordIndex}>
              {word.split('').map((symbol, symbolIndex) => (
                <span key={wordIndex + '-' + symbolIndex} style={{color: this.getColor(symbol, symbolIndex)}}>
                  {symbol}
                </span>
              ))}
              {' '}
            </span>
          ))}
        </b></p>
        <p className="main-text">inputedText: {this.props.inputText}</p>
        <p>Key Press Count: {this.props.keyPressCount}</p>
      </div>
    );
  }
}

export default Main;
