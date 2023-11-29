import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { DisplayQuiz } from "./DisplayQuiz";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    fetchQuestions().then((res: any) => {
      setQuestions(res.data.questions);
    });
  }, [reset]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3004/api/v1/list-quizs?questionNumber=${4}`
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const onClickReset = () => {
    setReset(!reset);
  };

  return (
    <div>
      <DisplayQuiz questions={questions} onClickRest={onClickReset} />
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
};

export default App;
