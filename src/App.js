// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Import components
import AddWordForm from './components/AddWordForm';
import Quiz from './components/Quiz';

function App() {
  const [words, setWords] = useState([]);
  const [showAddWordForm, setShowAddWordForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for Dark Mode

  // Use the API URL from environment variables, with a fallback to 'http://localhost:5000'
  const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').trim();

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

  // Function to add a new word to the list
  const handleAddWord = (newWord) => {
    setWords([...words, newWord]);
    setShowAddWordForm(false); // Hide the form after adding the word
  };

  // Function to toggle the AddWordForm
  const toggleAddWordForm = () => {
    setShowAddWordForm(!showAddWordForm);
  };

  // Function to toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add or remove the 'dark-mode' class on the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="App">
      {/* Dark Mode Toggle Switch */}
      <div className="toggle-switch">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            Dark Mode
          </label>
        </div>
      </div>

      <div className="container"> {/* Bootstrap container */}
        {/* Header Image */}
        <img
          src={`${process.env.PUBLIC_URL}/header-image.jpg`}
          alt="Header"
          className="img-fluid header-image"
        />

        {/* Main Title */}
        <h1 className="my-4 text-center">Alder's Learning App</h1>

        {/* Word Count and Add Word Button */}
        <div className="word-count mb-4 text-center">
          <p>You have {getWordCount()} words in your database.</p>
          <p>
            Feel free to{' '}
            <button className="btn btn-link p-0" onClick={toggleAddWordForm}>
              add a word
            </button>
            .
          </p>
        </div>

        {/* Add Word Section (conditionally rendered) */}
        {showAddWordForm && (
          <div className="add-word-section mb-5">
            <AddWordForm onAddWord={handleAddWord} />
          </div>
        )}

        {/* Quiz Section */}
        <div className="quiz-section">
          <Quiz words={words} />
        </div>
      </div>
    </div>
  );
}

export default App;
