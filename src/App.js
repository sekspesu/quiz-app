import React, { useState, useEffect } from 'react';
import './App.css';
import AddWordForm from './components/AddWordForm';
import WordCount from './components/WordCount';
import Quiz from './components/Quiz';
import axios from 'axios';

function App() {
  const [words, setWords] = useState([]);

  // Use the API URL from environment variables, trim to remove any whitespace
  const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').trim();

  // Add console.log to check the value of API_URL
  console.log('API_URL:', API_URL);
  console.log('API_URL Character Codes:', API_URL.split('').map(c => c.charCodeAt(0)));

  // Load words from the backend when the app mounts
  useEffect(() => {
    axios.get(`${API_URL}/api/words`)
      .then(response => {
        setWords(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the words!', error);
      });
  }, [API_URL]);

  const addWord = (word) => {
    axios.post(`${API_URL}/api/words`, word)
      .then(response => {
        setWords([...words, response.data]);
      })
      .catch(error => {
        console.error('There was an error adding the word!', error);
      });
  };

  // Function to get the count of unique English words
  const getUniqueWordCount = () => {
    const uniqueWords = new Set(words.map((word) => word.word));
    return uniqueWords.size;
  };

  return (
    <div className="App">
      <h1>Alder's Learning App</h1>
      <AddWordForm onAddWord={addWord} />
      <WordCount wordCount={getUniqueWordCount()} />
      <Quiz words={words} />
    </div>
  );
}

export default App;
