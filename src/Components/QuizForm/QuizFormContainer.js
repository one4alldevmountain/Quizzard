import React, { Component } from 'react';
import { QuestionCard } from './QuestionCard';
import QuizLowerForm from './QuizLowerForm';



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
    checkInputsValidity = () => {
                if(this.state.quizType !== '' && this.state.inputType !== ''){
                    return true;
                }else{
                    return false;
                };
    }

    handleAddQuestion = (quizType) => {
        let questionsArray = this.state.quiz.questions.slice(0);
        if(quizType === 'sorted'){
            questionsArray.push({
                questionContent: '',
                category: '',
                answers: []
            });
        }
        else{
            questionsArray.push({
                questionContent: '',
                answers: []
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
            console.log(JSON.stringify(questions, questionIndex))
            if(this.state.quizType === 'sorted')
            questions[questionIndex].answers.push({
                answerContent: '',
                category: '',
                
            })
            else{
                questions[questionIndex].answers.push({
                    answerContent: '',
                })
            }
            
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
    handleAddCorrectAnswer = (questionIndex, answerIndex, inputType) => {
        if(!this.state.quiz.questions[questionIndex].correctAnswers){
            this.setState(prevState => {
                const questions = prevState.quiz.questions.slice(0);
                questions[questionIndex].correctAnswers = [];

                return {
                    ...prevState,
                    quiz: {
                        ...prevState.quiz,
                        questions: questions,
                    }
                }
            })
        }
        console.log(questionIndex)
        console.log(this.state.quiz.questions[questionIndex])
        const indexOfAnswer = this.state.quiz.questions[questionIndex].correctAnswers ? this.state.quiz.questions[questionIndex].correctAnswers.findIndex(answer => {
            return answer === answerIndex;
        }): null;

        if(indexOfAnswer !== -1){

            if(inputType === 'multipleChoice' || inputType === 'boolean'){
                this.setState(prevState => {
                    const questions = prevState.quiz.questions.slice(0);
                    questions[questionIndex].correctAnswers = [answerIndex];
    
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
                const questions = prevState.quiz.questions.slice(0);
                questions[questionIndex].correctAnswers.slice(indexOfAnswer, 1);
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
    displayQuestions = (quizType, inputType, questions) => {

        if(questions){
            return(
                <div>

                    {questions.map((question, index) => {
                        return(
                            <div key={index}>
                                {JSON.stringify(question)}
                                {console.log(this.state.quiz.questions[0], index)}
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
        
        
        return(
            <div>
                <label>
                    Test Type
                    <select value={this.state.quizType} onChange={event => this.handleUpperTypeChange(event.target.value, 'quizType' )}>
                        <option value="">------Please choose an option.------</option>
                        <option value="graded">Graded</option>
                        <option value="sorted">Sorted</option>
                        <option value="survey">Survey</option>
                    </select>
                </label>
                <label>
                Input Type
                <select value={this.state.inputType} onChange={event => this.handleUpperTypeChange(event.target.value, 'inputType' )}>
                    <option value="">------Please choose an option.------</option>
                    <option value="boolean">True/False</option>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="chooseMultiple">Choose Multiple</option>
                    {/* <option value="fillInTheBlank">Fill in the blank</option> */}
                    <option value="openEnded">Open Ended</option>
                </select>
                </label>
                
                {JSON.stringify(this.state)};

                <div>
                    upperForm
                </div>
                <hr/>
                { this.state.inputsAreValid ? <div>
                    LowerForm
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
                            </div>: null
                          }
                        {this.displayQuestions(this.state.quizType, this.state.inputType, this.state.quiz.questions )}
                    <button onClick={ () => this.handleAddQuestion(this.state.quizType)}>add question</button>
                    
                    <div>
                        <button type='submit'> Create </button>

                    </div>
                </div> : null}
            </div>
        )
    }

}


export default QuizFormContainer;