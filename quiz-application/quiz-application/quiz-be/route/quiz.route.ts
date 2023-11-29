import { Router, Request, Response } from "express";
const router = Router();
import { listQuizs, saveQuizScore, saveQuestions } from "../controller/quiz.controller";


router.get("/list-quizs", listQuizs);

router.post("/quiz-score", saveQuizScore);

router.post("/save-questions", saveQuestions);


export default router;