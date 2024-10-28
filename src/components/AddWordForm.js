// src/components/AddWordForm.js

import React, { useState } from 'react';

function AddWordForm({ onAddWord }) {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the new word object
    const newWord = {
      word: word.trim(),
      translation: translation.trim(),
    };

    // Call the onAddWord function passed from the parent component
    onAddWord(newWord);

    // Clear the form
    setWord('');
    setTranslation('');
  };

  return (
    <div className="add-word-form">
      <h2 className="mb-4">Add a New Word</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Word in English:</label>
          <input
            type="text"
            className="form-control"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Translation:</label>
          <input
            type="text"
            className="form-control"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Add Word
        </button>
      </form>
    </div>
  );
}

export default AddWordForm;
