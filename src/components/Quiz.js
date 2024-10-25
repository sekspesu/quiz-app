// src/components/Quiz.js
import React, { useState } from 'react';

function Quiz({ words }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintSentence, setHintSentence] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  // Start the quiz by selecting a random word
  const startQuiz = () => {
    if (words.length === 0) {
      // Do not start the quiz if there are no words
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setUserAnswer('');
    setFeedback('');
    setShowHint(false);
    setHintSentence('');
    setQuizStarted(true);
  };

  // Check the user's answer
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

  // Show a hint (example sentence)
  const handleHint = () => {
    if (
      currentWord.exampleSentences &&
      currentWord.exampleSentences.length > 0
    ) {
      // Display a random example sentence
      const randomIndex = Math.floor(
        Math.random() * currentWord.exampleSentences.length
      );
      setHintSentence(currentWord.exampleSentences[randomIndex]);
      setShowHint(true);
    } else {
      // No example sentences available
      setHintSentence('No hint available for this word.');
      setShowHint(true);
    }
  };

  // Proceed to the next word
  const handleNextWord = () => {
    startQuiz();
  };

  // Reset the quiz to the initial state
  const handleReset = () => {
    setCurrentWord(null);
    setUserAnswer('');
    setFeedback('');
    setShowHint(false);
    setHintSentence('');
    setQuizStarted(false);
  };

  return (
    <div className="quiz-section">
      <h2>Take a Quiz</h2>
      {words.length === 0 ? (
        <p>Please add some words first!</p>
      ) : !quizStarted ? (
        <div className="start-quiz-container">
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : currentWord ? (
        <div>
          <p className="quiz-word">
            Translate: <strong>{currentWord.word}</strong>
          </p>

          {/* Show hint if available */}
          {showHint && (
            <div className="hint">
              <h3>Example Sentence:</h3>
              <p>{hintSentence}</p>
            </div>
          )}

          {/* Input Field */}
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

          {/* Feedback */}
          {feedback && <p className="feedback">{feedback}</p>}

          {/* Buttons */}
          <div className="quiz-buttons">
            <button onClick={checkAnswer}>Submit</button>
            <button onClick={handleHint}>IDK/HINT</button>
            <button onClick={handleNextWord}>Next Word</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Reset Button */}
      {quizStarted && (
        <div className="reset-button-container">
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
