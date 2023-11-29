import mongoose, {Schema, Model} from "mongoose";
import { QuizModel } from "./quizModel.type";

const quizSchema = new Schema<QuizModel>({
  quizScore: { type: Number, required: true },
  createdAt: Date
});

const QuizModel = mongoose.model('Quiz', quizSchema);

export default QuizModel;