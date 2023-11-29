import mongoose, {Schema, Model} from "mongoose";
import { QuestionModel } from "./quizModel.type";

const questionSchema = new Schema<QuestionModel>({
    question: { type: String, required: true },
    answerMultiOption: {type: String, required: true}
});

const QuestionModel = mongoose.model('Question', questionSchema);

export default QuestionModel;