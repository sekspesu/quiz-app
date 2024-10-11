// src/components/WordCount.js
import React from 'react';

function WordCount({ wordCount }) {
  return (
    <div className="word-count">
      <h2>Your Vocabulary</h2>
      <p>You have {wordCount} words in your database.</p>
    </div>
  );
}

export default WordCount;
