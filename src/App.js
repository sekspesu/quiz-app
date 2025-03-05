// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Quiz from './components/Quiz';

function App() {
  const [words, setWords] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Use the API URL from environment variables, with a fallback to 'http://localhost:5000'
  const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').trim();

  // Set dark mode by default
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  // Load words from the backend when the app mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/api/words`)
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the words!', error);
      });
  }, [API_URL]);

  // Function to get the count of unique words
  const getWordCount = () => {
    return words.length;
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    setQuizStarted(false);
  };

  return (
    <div className="App">
      <div className={`container ${quizStarted ? 'quiz-active' : ''}`}>
        {/* Header Image */}
        <img
          src={`${process.env.PUBLIC_URL}/header-image.jpg`}
          alt="Header"
          className="img-fluid header-image"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />

        {/* Main Title */}
        <h1 className="my-4 text-center" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Alder's Learning App
        </h1>

        {/* Word Count */}
        {!quizStarted && (
          <div className="word-count mb-4 text-center">
            <p>You have {getWordCount()} words in your database.</p>
          </div>
        )}

        {/* Quiz Section */}
        <div className="quiz-section">
          <Quiz
            words={words}
            quizStarted={quizStarted}
            setQuizStarted={setQuizStarted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
