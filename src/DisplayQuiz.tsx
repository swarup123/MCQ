import React, { useState, useEffect } from "react";
import axios from "axios";

export const DisplayQuiz = ({ questions }: any) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const submitAnswers = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3004/api/v1/quiz-score`,
        { score }
      );
      setScore(response.data.score);
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  const handleAnswerButtonClick = (isCorrect: boolean) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }

    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      <h1>Quiz Application</h1>
      <div className="app">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>
                {questions.length}
              </div>
              <div className="question-text">
                {questions &&
                  questions[currentQuestion] &&
                  questions[currentQuestion].question}
              </div>
            </div>

            <div className="answer-section">
              {questions &&
                questions[currentQuestion] &&
                questions[currentQuestion].answerMultiOption &&
                JSON.parse(questions[currentQuestion].answerMultiOption).map(
                  (answerOptions: any) => (
                    <button
                      key={answerOptions.answerText}
                      onClick={() =>
                        handleAnswerButtonClick(answerOptions.isCorrect)
                      }
                    >
                      {answerOptions.answerText}
                    </button>
                  )
                )}
            </div>
          </>
        )}
      </div>
      <button onClick={submitAnswers}>Submit</button>

      {score > 0 && <div>Your score: {score}</div>}
    </div>
  );
};

