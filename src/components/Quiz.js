// src/components/Quiz.js

import React, { useState, useEffect } from 'react';

function Quiz({ words, quizStarted, setQuizStarted }) {
  // **State Variables**

  // Current word being quizzed
  const [currentWord, setCurrentWord] = useState(null);

  // Options for the multiple-choice question
  const [options, setOptions] = useState([]);

  // Feedback message after answering
  const [feedback, setFeedback] = useState('');

  // User's XP points, initialized from localStorage
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('xp')) || 0;
  });

  // User's rank based on XP
  const [rank, setRank] = useState('Beginner');

  // Index of the selected option
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Indicates whether the selected answer is correct
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  // Animation state for question transitions
  const [animateQuestion, setAnimateQuestion] = useState(false);

  // Timer state for auto-progress
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // **Effect to Update Rank and Save XP to localStorage**
  useEffect(() => {
    localStorage.setItem('xp', xp);

    if (xp >= 150) {
      setRank('Expert');
    } else if (xp >= 100) {
      setRank('Advanced');
    } else if (xp >= 50) {
      setRank('Intermediate');
    } else {
      setRank('Beginner');
    }
  }, [xp]);

  // **Calculate Progress Towards Next Rank**
  const getNextRankXp = () => {
    if (xp >= 150) return 200; // Arbitrary upper limit
    if (xp >= 100) return 150;
    if (xp >= 50) return 100;
    return 50;
  };

  const getCurrentRankBaseXp = () => {
    if (xp >= 150) return 150;
    if (xp >= 100) return 100;
    if (xp >= 50) return 50;
    return 0;
  };

  const progressPercentage =
    ((xp - getCurrentRankBaseXp()) / (getNextRankXp() - getCurrentRankBaseXp())) *
    100;

  // **Start the Quiz**
  const startQuiz = () => {
    if (words.length === 0) {
      // Do not start the quiz if there are no words
      return;
    }
    generateQuestion();
    setFeedback('');
    setSelectedOptionIndex(null);
    setIsAnswerCorrect(null);
    setQuizStarted(true); // Update quizStarted in App.js
    setAnimateQuestion(true); // Trigger animation
  };

  // **Generate a New Question**
  const generateQuestion = () => {
    // Select a random word as the current word
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setCurrentWord(word);

    // Generate options
    const incorrectOptions = words
      .filter((w) => w.translation !== word.translation)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2); // Get 2 incorrect translations

    // Combine correct and incorrect options and shuffle them
    const allOptions = [...incorrectOptions, word].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  // **Handle User's Answer Selection**
  const handleOptionClick = (selectedOption, index) => {
    if (feedback) {
      // Prevent multiple selections for the same question
      return;
    }

    let earnedXp = 0;
    let newFeedback = '';
    const isCorrect = selectedOption.translation === currentWord.translation;

    if (isCorrect) {
      newFeedback = 'Correct!';
      earnedXp = 10;
      // Start timer for correct answer
      setTimeLeft(2);
      const timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleNextWord();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(timerInterval);
    } else {
      newFeedback = `Incorrect. The correct translation is "${currentWord.translation}".`;
      earnedXp = -2; // Deduct XP for incorrect answer
      // Start 5-second timer for incorrect answer
      setTimeLeft(5);
      const timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleNextWord();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(timerInterval);
    }

    setXp((prevXp) => Math.max(prevXp + earnedXp, 0)); // Ensure XP doesn't go below 0
    setFeedback(newFeedback);

    // Set visual feedback
    setSelectedOptionIndex(index);
    setIsAnswerCorrect(isCorrect);
  };

  // **Proceed to the Next Word**
  const handleNextWord = () => {
    // Clear any existing timer
    if (timer) {
      clearInterval(timer);
      setTimer(null);
      setTimeLeft(0);
    }

    // Trigger exit animation
    setAnimateQuestion(false);
    
    // Short delay before changing the question to allow for animation
    setTimeout(() => {
      generateQuestion();
      setFeedback('');
      setSelectedOptionIndex(null);
      setIsAnswerCorrect(null);
      
      // Trigger entrance animation for new question
      setTimeout(() => {
        setAnimateQuestion(true);
      }, 50);
    }, 300);
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  // **Reset the Quiz**
  const handleReset = () => {
    setAnimateQuestion(false);
    
    setTimeout(() => {
      setCurrentWord(null);
      setOptions([]);
      setFeedback('');
      setSelectedOptionIndex(null);
      setIsAnswerCorrect(null);
      setXp(0);
      setRank('Beginner');
      localStorage.removeItem('xp');
      setQuizStarted(false); // Update quizStarted in App.js
    }, 300);
  };

  return (
    <div className="quiz-section">
      {!quizStarted && <h2 className="mb-4 text-center">Take a Quiz</h2>}

      {/* Display XP and Rank with Progress Bar */}
      {quizStarted && (
        <div className="xp-rank-container mb-3">
          <p>
            <strong>XP:</strong> {xp} &nbsp; | &nbsp; <strong>Rank:</strong> {rank}
          </p>
          <div className="progress" style={{ height: '20px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${Math.min(Math.max(progressPercentage, 0), 100)}%`,
              }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.floor(Math.min(Math.max(progressPercentage, 0), 100))}%
            </div>
          </div>
        </div>
      )}

      {words.length === 0 ? (
        <p className="text-white">Please add some words first!</p>
      ) : !quizStarted ? (
        <div className="start-quiz-container text-center">
          <button className="btn btn-start-quiz" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : currentWord ? (
        <div className={`quiz-content ${animateQuestion ? 'animate-in' : 'animate-out'}`}>
          <p className="quiz-word lead">
            Translate: <strong>{currentWord.word}</strong>
          </p>

          {/* Multiple Choice Options */}
          <div className="options-container mb-3">
            {options.map((option, index) => (
              <button
                key={index}
                className={`btn option-button mb-2 ${
                  feedback && index === selectedOptionIndex
                    ? isAnswerCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleOptionClick(option, index)}
                disabled={!!feedback} // Disable buttons after an option is selected
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <span className="option-text">{option.translation}</span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <>
              {isAnswerCorrect ? (
                <div className="alert alert-success">
                  <p className="feedback">
                    <span>✅ <strong>{feedback}</strong> ({timeLeft}s)</span>
                  </p>
                  <button className="btn btn-success mt-2" onClick={handleNextWord}>
                    Next Word
                  </button>
                </div>
              ) : (
                <div className="alert alert-danger">
                  <p className="feedback">
                    <span>❌ <strong>{feedback}</strong> ({timeLeft}s)</span>
                  </p>
                </div>
              )}
            </>
          )}

          {/* Buttons */}
          <div className="quiz-buttons d-flex justify-content-center mb-3">
            {!isAnswerCorrect && feedback && (
              <button className="btn btn-success mx-2" onClick={handleNextWord}>
                Next Word
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-white">Loading...</p>
      )}

      {/* Reset Button */}
      {quizStarted && (
        <div className="reset-button-container text-center">
          <button className="btn btn-danger" onClick={handleReset}>
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
