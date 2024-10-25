// src/components/Quiz.js
import React, { useState } from 'react';

function Quiz({ words }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const startQuiz = () => {
    if (words.length === 0) {
      alert('Please add some words first!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setUserAnswer('');
    setFeedback('');
    setShowTranslation(false);
  };

  const checkAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() ===
      currentWord.translation.trim().toLowerCase()
    ) {
      setFeedback('Correct!');
    } else {
      setFeedback(
        `Incorrect. The correct translation is "${currentWord.translation}".`
      );
    }
  };

  const showAnswer = () => {
    setShowTranslation(true);
  };

  return (
    <div className="quiz-section">
      <h2>Take a Quiz</h2>
      {currentWord ? (
        <div>
          <p>
            Translate: <strong>{currentWord.word}</strong>
          </p>
          <input
            type="text"
            placeholder="Your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                checkAnswer();
              }
            }}
          />
          <div className="quiz-buttons">
            <button onClick={checkAnswer}>Submit</button>
            <button onClick={showAnswer}>IDK</button>
            <button onClick={startQuiz}>Next Word</button>
          </div>
          {showTranslation && (
            <p className="feedback">
              The correct translation is "{currentWord.translation}".
            </p>
          )}
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      ) : (
        <button onClick={startQuiz}>Start Quiz</button>
      )}
    </div>
  );
}

export default Quiz;
