const express = require('express');
const Quiz = require('../db/models/Quiz.model');



const ApiRouter = express.Router();


ApiRouter.post('/createquiz', (req, res) => {
    const newQuiz = new Quiz({
        whoToEmail: ['justusmray@gmail.com'],
        inputType: 'boolean',
        quizType: 'graded',
        categories: [],
        questions:[
            {
                answers: [{answerContent: "True", category: ""}, {answerContent: "False", category: ""}],
                correctAnswers: [0],
                questionContent: "test question",
            },
            {
                answers: [{answerContent: "True", category: ""}, {answerContent: "False", category: ""}],
                correctAnswers: [0],
                questionContent: "test question2",
            },
            {
                answers: [{answerContent: "True", category: ""}, {answerContent: "False", category: ""}],
                correctAnswers: [1],
                questionContent: "test question3",
            },
        ],
        urlExtension: 'hiasdfthia',

    })

    newQuiz.save();

    res.send('created');
})


module.exports = {
    ApiRouter,
}