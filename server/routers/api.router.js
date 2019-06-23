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


ApiRouter.get('/quiz/:pin', (req, res) => {
    res.send({
        
            whoToEmail: ['justusmray@gmail.com'],
            categories: [
                'griffindoor',
                'hufflepuff',
                'slytherin',
                'ravenclaw',
            ],
            urlExtension: 'fasdfasdfasdf',
            quizType: 'graded',
            inputType: 'multipleChoice',
            questions: [
                {
                    questionContent: 'lorem ipsum delor sit amet ',
                    answers: [
                        {
                            answerContent: ' answer 1',
                            category: '',
                        },
                        {
                            answerContent: ' answer 2',
                            category: '',
                        },
                        {
                            answerContent: ' answer 3',
                            category: '',
                        },
                    ],
                    correctAnswers: [0],
                },
                {
                    questionContent: 'random question 123 ',
                    answers: [
                        {
                            answerContent: ' answer 1',
                            category: '',
                        },
                        {
                            answerContent: ' answer 2',
                            category: '',
                        },
                        {
                            answerContent: ' answer 3',
                            category: '',
                        },
                    ],
                    correctAnswers: [2],
                },
                    {
                        questionContent: 'test question of the century',
                        answers: [
                            {
                                answerContent: ' answer 1',
                                category: '',
                            },
                            {
                                answerContent: ' answer 2',
                                category: '',
                            },
                            {
                                answerContent: ' answer 3',
                                category: '',
                            },
                        ],
                        correctAnswers: [1],
                    }
                
            ]
        
     
     
    })
})


module.exports = {
    ApiRouter,
}