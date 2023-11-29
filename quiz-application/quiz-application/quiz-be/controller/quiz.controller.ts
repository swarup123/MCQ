import { Request, Response } from "express";
import QuizModel from "../model/quizModel";
import QuestionModel from "../model/questionModel";

export const saveQuizScore = async (req: Request, res: Response) => {
  const methodName = "[saveQuizScore]";

  try {
    const {score } = req.body;

      const quiz = new QuizModel({
        quizScore: score,
        createdAt: Date.now()
      });

      let createdScore = await quiz.save();
      if (createdScore) {
        return res.send({
          statusCode: 200,
          userDetails: createdScore,
        });
      }
    
  } catch (error) {
    if (error) {
      return res.send({ statusCode: 400, error: error });
    }
  }
};

function shuffle(array: any) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

export const listQuizs = async (req: Request, res: Response) => {
  const methodName = "[listQuizs]";
  try {
    
    const questionNumber = req.query.questionNumber ? +req.query.questionNumber : 5;
    
    let questions = await QuestionModel.find({});
    
    
    let shuffleArray = shuffle(questions).slice(0, questionNumber);

    if (shuffleArray && shuffleArray.length) {
      return res.send({
        statusCode: 200,
        questions: shuffleArray
      });
    }
  } catch (error) {
    if (error) {
      return res.send({ statusCode: 400, error: error });
    }
  }
};

export const saveQuestions = async (req: Request, res: Response) => {
    const methodName = "[saveQuestions]";
    try {
      
      const {question, answerOption} = req.body;
      const quiz = new QuestionModel({
        question,
        answerMultiOption: answerOption
      });

      let createdQuestion = await quiz.save();
      if (createdQuestion) {
        return res.send({
          statusCode: 200,
          questions: createdQuestion,
        });
      }
    

    } catch (error) {
      if (error) {
        return res.send({ statusCode: 400, error: error });
      }
    }
  };