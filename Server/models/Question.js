// import mongoose from 'mongoose ';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const QuestiongSchema = new mongoose.Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    lastDay:{
        type: Date,
    },
    question:{
        type: String,
        required: true
    }

}, {
    versionKey: false
})

const Question = mongoose.model('Question', QuestiongSchema);
export default Question


