import React, { Component } from 'react';
import { QuestionCard } from './QuestionCard';
import './QuizForm.scss'
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';


class QuizForm extends Component {

    constructor() {
        super();
        this.state = {

            whoToEmail: [],
            categoryInput: '',
            quizName: '',
            quizType: '',
            inputType: '',
            inputsAreValid: false,
            showQuestionEditer: false,
            quiz: {
                categories: [
                ],
                questions: [
                ]
            }
        }
    }
    
    //Create quiz form functions
    checkInputsValid = () => {
        if(this.state.quizName && this.state.quizType && this.state.inputType && this.state.whoToEmail.length !== 0){
            return true;
        }else{
            toast.error('You are missing some inputs.')
        }
    }
    toggleQuestionEditer = () => {
        if(this.state.showQuestionEditer === false && this.checkInputsValid() === true){
            this.setState({showQuestionEditer: true});
        }else{
            this.setState({showQuestionEditer: false});
        };
    }
    handleUpperTypeChange = (value, whatToUpdate) => {
        this.setState({[whatToUpdate]: value});
    }
    handleQuizNameChange = (value) => {
        this.setState({quizName: value})
    }
    handleWhoToEmail = (value) => {
        this.setState(prevState => {
            let whoToEmail = prevState.whoToEmail.slice(0);
            if (whoToEmail.includes(value)) {
                whoToEmail = whoToEmail.filter(whoToEmail => {
                    return whoToEmail !== value;
                })
            }
            else {
                whoToEmail = [
                    ...prevState.whoToEmail,
                    value
                ]
            }

            return {
                ...prevState,
                whoToEmail,

            }
        })
    }
    //question form functions
    handleQuestionChange = (content, index) => {
        this.setState((previousState) => {
            let questions = previousState.quiz.questions.slice(0);
            questions[index]['questionContent'] = content;

            return {
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

    handleAddQuestion = () => {
        let questionsArray = this.state.quiz.questions.slice(0);
        window.scrollTo(10000,10000000)
        if (this.state.inputType === 'boolean') {
            questionsArray.push({
                answers: [{ answerContent: 'True', category: '' }, { answerContent: 'False', category: '' }],
                correctAnswers: [],
            });
        }
        else {
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
        }, () => {
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
    handleAddCategory = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            return {
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
        }) : null;

        if (indexOfAnswer === -1) {

            if (inputType === 'multipleChoice' || inputType === 'boolean') {
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
            else {
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
        else {
            this.setState(prevState => {
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

        if (this.state.quiz.questions.length === 0 || this.state.whoToEmail.length === 0) {
            toast.error('You are missing some inputs')
        }
        else {

            const {
                quiz,
                inputType,
                quizType,
                whoToEmail,
            } = this.state;
            axios.post('/api/quiz', {
                quizName: this.state.quizName,
                quizOwner: this.props._id,// object with email in it
                inputType,
                quizType,
                whoToEmail,
                categories: quiz.categories,
                questions: quiz.questions,

            }).then(response => {
                this.props.history.push( `/home/${response.data.urlExtension}`)
                
            }).catch(err => {
                toast.error('Failed to post quiz');
            })
        }
    }
    displayQuestions = (quizType, inputType, questions) => {
        if (questions) {
            return (
                <div>
                    {questions.map((question, index) => {
                        return (
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
        else {
            return null;
        }
    }
    render() {
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
                return <option key={option} value={option}>{option}</option>
            }) : null;
        return (
            <div className='center-elements'>


                {/* Make quiz form */}
                <div className='form-container' style={{display: this.state.showQuestionEditer ? 'none' : null}}>

                    <div>
                        <label>
                            <p>Quiz Name</p>
                            
                            <input
                                className='quiz-form-input'
                                type='text'
                                onChange={event => this.handleQuizNameChange(event.target.value)}/>
                        </label>
                    </div>

                    <div>
                        <label>
                            <p>Test Type</p>
                            <select value={this.state.quizType} onChange={event => this.handleUpperTypeChange(event.target.value, 'quizType')}>
                                <option value="">Please choose a quiz type</option>
                                <option value="graded">Graded</option>
                                <option value="sorted">Sorted</option>
                                <option value="survey">Survey</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            <p>Question Type</p>
                            <select value={this.state.inputType} onChange={event => this.handleUpperTypeChange(event.target.value, 'inputType')}>

                                {this.state.quizType ? <option>Please select the question type</option> : <option>Please select a Quiz type first</option>}
                                {inputType}
                            </select>
                        </label>
                    </div>

                    <div >
                        <p> Who To Email: </p>
                    </div>

                    <div >
                        Quiz Maker
                            <input
                            type='checkbox'
                            value='quizOwner'
                            name='whoToEmail'
                            onChange={(event) => this.handleWhoToEmail(event.target.value)}/>
                    </div>
                    
                    <div>
                        Quiz Taker  <input
                            type='checkbox'
                            value='quizTaker'
                            name='whoToEmail'
                            onChange={(event) => this.handleWhoToEmail(event.target.value)}/>
                    </div>
                    <button onClick={() => this.toggleQuestionEditer()}>Create Questions</button>
                </div>


                {/* make questions form */}
                    <div className='questions-container floating ' style={{display: this.state.showQuestionEditer ? null : 'none'}}>
                        {
                            this.state.quizType === 'sorted' ?
                                <div className='categories'>
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
                                    <br />
                                    {this.state.quiz.categories.map((category, index) => {
                                        return <div key={category + index}>{category}</div>
                                    })}
                                </div> : null
                        }
                        {this.displayQuestions(this.state.quizType, this.state.inputType, this.state.quiz.questions)}
                        <div>
                            <button
                                onClick={() => this.handleAddQuestion(this.state.quizType)}>
                                <p>Add a Question</p>
                                </button>
                        </div>
                            <button
                                 onClick={() => this.handleSubmitForm()}> Create Quiz 
                            </button>
                    </div> 
                    
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    const {
        _id,
    } = reduxState;
    return{
        _id,
    }
}
export default connect(mapStateToProps)(QuizForm) ;