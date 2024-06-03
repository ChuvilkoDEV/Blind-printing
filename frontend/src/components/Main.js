import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Main() {
  const [randomTextData, setRandomTextData] = useState([]);
  const [randomText, setRandomText] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchRandomText = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/random-text/');
        if (response.data && response.data.text) {
          setRandomTextData(response.data);
          setRandomText(response.data.text.split(''));  // Преобразуем строку в массив символов
        } else {
          console.error('Response data is not in the expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching random text:', error);
      }
    };

    fetchRandomText();

    const handleKeyDown = (event) => {
      console.log(event.key);
      setInputText((prevText) => prevText + event.key);
      console.log(inputText);

    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const InputField = () => {
    return (
      <div>
        <p>
          {randomText.map((symbol, index) => (
            <span
              key={index}
              style={{
                color: inputText[index] === symbol ? 'green' : 'red',
              }}
            >
              {symbol}
            </span>
          ))}
        </p>
      </div>
    );
  };

  return (
    <div>
      <InputField />
    </div>
  );
}
