// import mongoose from 'mongoose ';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const AnswerSchema = new mongoose.Schema({
    studentId: {
        type: Schema.Types.ObjectId,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    isUploadOnTime:{
        type : Boolean
    }


}, {
    versionKey: false
})

const Answer = mongoose.model('Answer', AnswerSchema);
export default Answer


