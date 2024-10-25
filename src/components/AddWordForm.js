// src/components/AddWordForm.js

import React, { useState } from 'react';
import axios from 'axios';

function AddWordForm({ onAddWord }) {
  const [showForm, setShowForm] = useState(false);
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').trim();

  // Toggle form visibility
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() && translation.trim()) {
      const newWord = { word: word.trim(), translation: translation.trim() };
      axios.post(`${API_URL}/api/words`, newWord)
        .then(response => {
          onAddWord(response.data);
          setWord('');
          setTranslation('');
          setShowForm(false); // Hide form after submission
        })
        .catch(error => {
          console.error('There was an error adding the word!', error);
        });
    }
  };

  return (
    <div className="add-word-section">
      <button onClick={handleToggleForm} className="add-word-button">
        {showForm ? 'Cancel' : 'Add Word'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="word"
            placeholder="Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
          <input
            type="text"
            name="translation"
            placeholder="Translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddWordForm;
