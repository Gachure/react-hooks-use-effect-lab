import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Add useEffect to manage the countdown timer
  useEffect(() => {
    // Create a timer that decrements timeRemaining by 1 every second
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // When time runs out, reset the timer and call onAnswered(false)
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    // Cleanup function to clear the timeout when component unmounts or re-renders
    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining, onAnswered]); // Depend on timeRemaining and onAnswered to avoid stale state

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
