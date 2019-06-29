const express = require('express');
const shortid = require('shortid')
const Quiz = require('../db/models/Quiz.model');
const {resultReducer} = require('../utils/resultReducer');
 


const ApiRouter = express.Router();


ApiRouter.post('/quiz', (req, res) => {
    const {
        quizName,
        quizOwner,
        inputType,
        quizType,
        whoToEmail,
        categories,
        questions,

    } = req.body
    const newQuiz = new Quiz({
        quizName,
        quizOwner,
        inputType,
        quizType,
        whoToEmail,
        categories,
        questions,
        urlExtension: shortid.generate(),

    })

    newQuiz.save().then( response => {
        

        res.status(202).send(response)
        }).catch(err => {
        res.status(500).send(err)
        })   
})



ApiRouter.get('/quiz/:pin', (req, res) => {
    Quiz.findOne({urlExtension: req.params.pin }).then( quiz => {
        res.status(200).send(quiz)
    }
    ).catch(err => {
        res.status(500).send('error');
    })
})



ApiRouter.post('/submit', (req, res) => {
    resultReducer(req).then(result => {
        res.send('Email sent');
    })
    .catch( err => {
        res.status(500).send(err)
    })
    
})
module.exports = {
    ApiRouter,
}