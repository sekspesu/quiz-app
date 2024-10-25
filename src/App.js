// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Import components
import AddWordForm from './components/AddWordForm';
import Quiz from './components/Quiz';

// Import the image if it's in src/assets
// import headerImage from './assets/header-image.jpg';

function App() {
  const [words, setWords] = useState([]);

  // Use the API URL from environment variables, with a fallback to 'http://localhost:5000'
  const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').trim();

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

  // Function to get the count of unique words
  const getWordCount = () => {
    return words.length;
  };

  // Function to add a new word to the list
  const handleAddWord = (newWord) => {
    setWords([...words, newWord]);
  };

  return (
    <div className="App">
      {/* Header Image */}
      {/* If image is in src/assets and imported */}
      {/* <img src={headerImage} alt="Header" className="header-image" /> */}

      {/* If image is in public folder */}
      <img src={`${process.env.PUBLIC_URL}/header-image.jpg`} alt="Header" className="header-image" />

      {/* Main Title */}
      <h1>Alder's Learning App</h1>

      {/* Word Count */}
      <div className="word-count">
        <p>You have {getWordCount()} words in your database.</p>
      </div>

      {/* Add Word Section (moved here) */}
      <div className="add-word-section">
        <AddWordForm onAddWord={handleAddWord} />
      </div>

      {/* Quiz Section */}
      <div className="quiz-section">
        <Quiz words={words} />
      </div>
    </div>
  );
}

export default App;
