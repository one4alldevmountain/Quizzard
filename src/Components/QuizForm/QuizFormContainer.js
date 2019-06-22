import React, { Component } from 'react';
import { QuestionCard } from './QuestionCard';
import axios from 'axios';


class QuizFormContainer extends Component{



    constructor(){
        super();
        
        this.state = {
            
            whoToEmail: [],
            categoryInput: '',
            quizType: '',
            inputType: '',
            inputsAreValid: false,
            quiz: {
                categories: [

                ],
                questions: [
                    
                ]
            }
            



        }
    }

    //input change handlers
    handleUpperTypeChange = (value, whatToUpdate) => {
        this.setState({
            [whatToUpdate]: value,
        });
        
        const otherType = whatToUpdate === 'quizType' ? 'inputType' : 'quizType';

        if(this.state[otherType] && value){
            this.setState({inputsAreValid: true})
            
        }
        else{
            this.setState({inputsAreValid: false})
        }
        this.setState({
            quiz: {
                categories: [

                ],
                questions: [
                    
                ]
            }
        })
        
  
    }
    handleQuestionChange = (content, index) => {
        this.setState((previousState) => {
            let questions = previousState.quiz.questions.slice(0);
            questions[index]['questionContent'] = content;
            
            return{
                ...previousState,
                quiz: {
                    ...previousState.quiz,
                    questions: questions,
                    
                }
            }
        })

    }
    handleAnswerChange = (content, questionIndex, answerIndex) => {
        this.setState(prevState => {
            let questions = prevState.quiz.questions.slice(0);
            console.log(answerIndex)
            questions[questionIndex].answers[answerIndex].answerContent = content;

            return {
                ...prevState,
                quiz: {
                    ...prevState.quiz,
                    questions: questions,
                }
            }
        })
    }
    handleCategoryInputChange = (value) => {
        this.setState({
            categoryInput: value,
        })
    }
    

    handleAddQuestion = (quizType) => {
        let questionsArray = this.state.quiz.questions.slice(0);
       
        if(this.state.inputType === 'boolean'){
            questionsArray.push({
                answers: [{answerContent: 'True', category: ''}, {answerContent: 'False' , category: ''}],
                correctAnswers: [],
            });
        }
        else{
            questionsArray.push({
                questionContent: '',
                answers: [],
                correctAnswers: [],
            });

        }
        
       
        this.setState(prevState => {
            return {
                ...prevState,
                quiz: {
                    ...prevState.quiz,
                    questions: questionsArray,
                }
            }
        })
    }
    handleAddAnswer = (questionIndex) => {
        this.setState(prevState => {
            let questions = [
                ...prevState.quiz.questions,

            ]
            questions[questionIndex].answers.push({
                answerContent: '',
                category: '',
                
            })
            
            return {
                ...prevState,
                quiz: {
                    ...prevState.quiz,
                    questions: questions,
                }
            }
        })
    }
    handleAddCategory = (event ) => {
        event.preventDefault();

        this.setState(prevState => {
            return{
                ...prevState,
                quiz: {
                    ...prevState.quiz,
                    categories: [
                        ...prevState.quiz.categories,
                        this.state.categoryInput
                    ]
                }
            }
        })
        this.setState({
            categoryInput: '',
        })
    }
    handleAddAnswerCategory = (questionIndex, answerIndex, category) => {
        this.setState(prevState => {
            const questions = prevState.quiz.questions.slice(0);
            questions[questionIndex].answers[answerIndex].category = category;

            return {
                ...prevState,
                quiz: {
                    ...prevState.quiz,
                    questions: questions,
                }
            }
        })
    }
    
    handleAddCorrectAnswer = (questionIndex, answerIndex, inputType) => {
        
        const indexOfAnswer = this.state.quiz.questions[questionIndex].correctAnswers ? this.state.quiz.questions[questionIndex].correctAnswers.findIndex(answer => {
            return answer === answerIndex;
        }): null;

        if(indexOfAnswer === -1){

            if(inputType === 'multipleChoice' || inputType === 'boolean'){
                this.setState(prevState => {
                    const questions = prevState.quiz.questions.slice(0);
                    questions[questionIndex].correctAnswers = [answerIndex];
                    console.log(questions)
    
                    return {
                        ...prevState,
                        quiz: {
                            ...prevState.quiz,
                            questions: questions,
                        }
                    }
                })
            }
            else{
                this.setState(prevState => {
                    const questions = prevState.quiz.questions.slice(0);

                    questions[questionIndex].correctAnswers = [...questions[questionIndex].correctAnswers, answerIndex];
                    console.log('questions', questions)
                    return {
                        ...prevState,
                        quiz: {
                            ...prevState.quiz,
                            questions: questions,
                        }
                    }
                })
            }
        }
        else{
            this.setState(prevState => {
                console.log('hit')
                const questions = prevState.quiz.questions.slice(0);
                questions[questionIndex].correctAnswers.splice(indexOfAnswer, 1);
                return {
                    ...prevState,
                    quiz: {
                        ...prevState.quiz,
                        questions: questions,
                    }
                }
            })
        }
    }
    handleSubmitForm = (event) => {
        event.preventDefault();
        const {
            quiz,
            inputType,
            quizType,
            whoToEmail,
        } = this.state;
        axios.post('api/quiz', {
            quiz,
            inputType,
            quizType,
            whoToEmail,

        });
    }
    displayQuestions = (quizType, inputType, questions) => {

        if(questions){
            return(
                <div>

                    {questions.map((question, index) => {
                        return(
                            <div key={index}>
                                <div key={index}>
                                <QuestionCard  
                                    questionIndex={index} 
                                    quizType={quizType} 
                                    inputType={inputType} 
                                    answers={this.state.quiz.questions[index].answers}
                                    categories={this.state.quiz.categories}
                                    handleQuestionChange={this.handleQuestionChange} 
                                    handleAnswerChange={this.handleAnswerChange}
                                    handleAddAnswer={this.handleAddAnswer}
                                    handleAddCorrectAnswer={this.handleAddCorrectAnswer}
                                    handleAddAnswerCategory={this.handleAddAnswerCategory}

                                    />
                            </div>
                            </div> 
                        )
                    })}
                </div>
            )
        }
        else{
            return null;
        }
    }





    


    render(){
        const availableOptions = {
            graded: [
                'boolean',
                'multipleChoice',
                'chooseMultiple',
            ],
            sorted: [
                'boolean',
                'multipleChoice',
                'chooseMultiple',

            ],
            survey: [
                'boolean',
                'multipleChoice',
                'chooseMultiple',
                'openEnded',
            ]
        }

        const inputType = this.state.quizType ? 
        availableOptions[this.state.quizType].map(option => {
            return <option value={option}>{option}</option>
        }): null
        
        
        
        return(
            <div>
                <label>
                    Test Type
                    <select value={this.state.quizType} onChange={event => this.handleUpperTypeChange(event.target.value, 'quizType' )}>
                        <option value="">Please choose an option.</option>
                        <option value="graded">Graded</option>
                        <option value="sorted">Sorted</option>
                        <option value="survey">Survey</option>
                    </select>
                </label>
                <label>
                Input Type
                <select value={this.state.inputType} onChange={event => this.handleUpperTypeChange(event.target.value, 'inputType' )}>
                    
                    {this.state.quizType ? <option>Please select an input type.</option>: <option>Please select a Quiz type first.</option> }
                    {inputType}
                </select>
                </label>
                <div>
                    <label>
                        whoToEmail 
                        Quiz Owner<input type='checkbox' value='quizOwner' name='whoToEmail'/>
                        Quiz Taker<input type='checkbox' value='quizTaker' name='whoToEmail'/>
                        Custom<input type='checkbox' value='custom' name='whoToEmail'/>
                    </label>
                    
                </div>
                
                

                
                <hr/>
                { 
                    this.state.inputsAreValid ? 
                <div>
                    <h1>{this.state.quizType}</h1>

                        {
                            this.state.quizType === 'sorted' ? 
                            <div>
                                <input 
                                    type='text'
                                    placeholder='add a category'
                                    value={this.state.categoryInput}
                                    onChange={(event) => this.handleCategoryInputChange(event.target.value)}
                                    />
                                <button
                                    onClick={event => this.handleAddCategory(event)}
                                >
                                    +
                                </button>
                                <br/>
                                {this.state.quiz.categories.map(category => {
                                    return <div>{category}</div>
                                })}
                            </div>: null
                          }
                        {this.displayQuestions(this.state.quizType, this.state.inputType, this.state.quiz.questions )}
                    <button onClick={ () => this.handleAddQuestion(this.state.quizType)}>add question</button>
                    
                    <div>
                        <button type='submit' onClick={(event) => this.handleSubmitForm(event)}> Create Quiz </button>

                    </div>
                </div> :
                 null
                 }
            </div>
        )
    }

}


export default QuizFormContainer;