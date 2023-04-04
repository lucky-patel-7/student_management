// import mongoose from 'mongoose ';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const ScoresSchema = new mongoose.Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,    
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    Created:{
        type: Date,
        default: Date.now
    },

}, {
    versionKey: false
})

const Score = mongoose.model('Score', ScoresSchema);
export default Score


