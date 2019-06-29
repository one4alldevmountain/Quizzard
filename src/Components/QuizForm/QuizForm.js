import React, { Component } from 'react';
import { QuestionCard } from './QuestionCard';
import HeaderView from '../Header/HeaderView';
import { Link } from 'react-router-dom';
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

        if (this.state[otherType] && value) {
            this.setState({ inputsAreValid: true })

        }
        else {
            this.setState({ inputsAreValid: false })
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
    handleQuizNameChange = (value) => {
        this.setState({
            quizName: value,
        })
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


    handleAddQuestion = (quizType) => {
        let questionsArray = this.state.quiz.questions.slice(0);

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
        event.preventDefault();

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
                console.log(response)
                this.props.history.push('/home'+ `/${response.data.urlExtension}`)
                
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
                return <option value={option}>{option}</option>
            }) : null



        return (
            <div>
<<<<<<< HEAD
                <div className="header">
                </div>
                <div>
                    <label>
                        Quiz Name
                        <input
                            type='text'
                            className='quizName'
                            onChange={event => this.handleQuizNameChange(event.target.value)}
                            />
                    </label>
                </div>
                <label>
                    <div className="quiz_form_container">
                        <div className="backarrow-container">
=======
                
                      <div className="backarrow-container">
>>>>>>> e78216d7890ba6228d4119a3ff7bca1530809d17
                            <Link
                                className="form-back-arrow"
                                to="/Home">&#8592;</Link>
                       
                       </div>


                <label>
                    <div className="quiz_form_container">
                      
                    <section className="email-section">
                        <div className="who-to-mail-title-container">
                            <p className="who-to-mail-title"> Who To Email: </p>
                        </div>

                        <div className="email-options-container">
                            <div className="email-option1">
                                Quiz Maker
                                   <input
                                    className="quizmaker-input-box"
                                    type='checkbox'
                                    value='quizOwner'
                                    name='whoToEmail'
                                    onChange={(event) => this.handleWhoToEmail(event.target.value)}
                                />
                            </div>

                            <div className="email-option2">
                                Quiz Taker  <input
                                    className="quiztaker-input-box"
                                    type='checkbox'
                                    value='quizTaker'
                                    name='whoToEmail'
                                    onChange={(event) => this.handleWhoToEmail(event.target.value)}
                                />
                            </div>

                        </div>

                    


                        <div className="quiz-form-title-container">
                        <p className="quiz-form-title">Quiz Title:</p>
                        <input
                            type='text'
                            className="quiz-form-title-input"
                            onChange={event => this.handleQuizNameChange(event.target.value)}
                            />
                    </div>
                        <div className="test-type-container">
                            
                            <div className="test_type">
                                Test Type:

                                <select className="test-type-select" value={this.state.quizType} onChange={event => this.handleUpperTypeChange(event.target.value, 'quizType')}>
                                    <option className="option" value="">Select a quiz type</option>
                                    <option className="option" value="graded">Graded</option>
                                    <option className="option" value="sorted">Sorted</option>
                                    <option className="option" value="survey">Survey</option>
                                </select>
                            </div>

                            <div className="input_type">
                                 Question Type:
                                          <select className="input-type-select" value={this.state.inputType} onChange={event => this.handleUpperTypeChange(event.target.value, 'inputType')}>

                                            {this.state.quizType ? <option>Select the question type</option> : <option>Select a Quiz type first</option>}
                                            {inputType}
                                          </select>
                             </div>


                        </div>
                        </section>
                    </div>
                </label>
                


                <hr />
                {
                    this.state.inputsAreValid ?
                        <div className="quiz-card">
                            <center><h1 className="quiz-type-title">{this.state.quizType}</h1> </center>

                            <hr />


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
                                        <br />
                                        {this.state.quiz.categories.map(category => {
                                            return <div>{category}</div>
                                        })}
                                    </div> : null
                            }
                            {this.displayQuestions(this.state.quizType, this.state.inputType, this.state.quiz.questions)}


                            <div className="quiz-card-buttons">

                                <button
                                    className="add-question-button"
                                    onClick={() => this.handleAddQuestion(this.state.quizType)}>
                                    <p>Add a Question</p>
                                    &#43;</button>

                                <button
                                    className="create-quiz-button"
                                    type='submit' onClick={(event) => this.handleSubmitForm(event)}> Create Quiz </button>

                            </div>
                        </div> :
                        null
                }

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
//