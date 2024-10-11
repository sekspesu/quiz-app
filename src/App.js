// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AddWordForm from './components/AddWordForm';
import WordCount from './components/WordCount';
import Quiz from './components/Quiz';
import axios from 'axios';

function App() {
  const [words, setWords] = useState([]);

  // Load words from the backend when the app mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/words')
      .then(response => {
        setWords(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the words!', error);
      });
  }, []);

  const addWord = (word) => {
    axios.post('http://localhost:5000/api/words', word)
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
      <h1>Vocabulary Learning App</h1>
      <AddWordForm onAddWord={addWord} />
      <WordCount wordCount={getUniqueWordCount()} />
      <Quiz words={words} />
    </div>
  );
}

export default App;
