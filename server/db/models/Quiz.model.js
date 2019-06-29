const { Schema, model} = require('mongoose');
const shortid = require('shortid');


const QuestionsSchema = new Schema({
    answers: Array,
    correctAnswers: Array,
    questionContent: String,
});


const QuizSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    quizName: String,
    quizOwner: String,
    whoToEmail: Array,
    inputType: String,
    quizType: String,
    categories: Array,
    questions: [QuestionsSchema],
    urlExtension: String,

});


module.exports = model('Quiz', QuizSchema);


