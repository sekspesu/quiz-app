// src/components/WordCount.js
import React from 'react';

function WordCount({ wordCount }) {
  return (
    <div className="word-count">
      <h2 className="text-white mb-3">Your Vocabulary</h2>
      <p className="text-white mb-0">You have <span className="font-weight-bold">{wordCount}</span> words in your database.</p>
    </div>
  );
}

export default WordCount;
