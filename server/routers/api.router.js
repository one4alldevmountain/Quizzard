const express = require('express');
const shortid = require('shortid')
const Quiz = require('../db/models/Quiz.model');



const ApiRouter = express.Router();


ApiRouter.post('/quiz', (req, res) => {
    const {
        inputType,
        quizType,
        whoToEmail,
        categories,
        questions,

    } = req.body
    const newQuiz = new Quiz({
        
        inputType,
        quizType,
        whoToEmail,
        categories,
        questions,
        urlExtension: shortid.generate(),

    })

    newQuiz.save().then( () => {

        res.status(202).send('created')
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


module.exports = {
    ApiRouter,
}

ApiRouter.post('/submit', (req, res) => {
    
})