// src/components/AddWordForm.js
import React, { useState } from 'react';

function AddWordForm({ onAddWord }) {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (word && translation) {
      onAddWord({ word, translation });
      setWord('');
      setTranslation('');
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Word</h2>
      <input
        type="text"
        placeholder="Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        type="text"
        placeholder="Translation"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
      />
      <button type="submit">Add Word</button>
    </form>
  );
}

export default AddWordForm;
