const { Schema, model} = require('mongoose');


const QuestionsSchema = new Schema({
    answers: Array,
    correctAnswers: Array,
    questionContent: String,
});


const QuizSchema = new Schema({
    whoToEmail: Array,
    inputType: String,
    quizType: String,
    categories: Array,
    questions: [QuestionsSchema],
    urlExtension: String,

});


module.exports = model('Quiz', QuizSchema);


