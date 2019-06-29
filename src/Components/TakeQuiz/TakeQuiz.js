import React, { Component } from 'react';
import axios from 'axios';
import QuizCard from './QuizCard';
import { toast, ToastContainer } from 'react-toastify';




class TakeQuiz extends Component{

        constructor(){
            super();

            this.state = {
                quizOwner: '',
                quizName: '',
                quizType: 'fsdfas',
                inputType: '',
                questions: [],
                categories: [],
                whoToEmail: [],

                openEndedInput: {},


            }
        }
        componentWillMount(){
            this.getQuiz(this.props.match.params.pin);
        }
        getQuiz = (urlExtention) => {
            axios.get('/api/quiz/' + urlExtention).then(res => {

                const {
                    whoToEmail,
                    quizName,
                    quizOwner,
                    inputType,
                    quizType,
                    categories,
                    questions,
                } = res.data;
                
                this.setState({
                    whoToEmail,
                    quizName,
                    quizOwner,
                    inputType,
                    quizType,
                    categories,
                    questions,
                });
            })   
            .then(() =>{
                console.log('done');
            }).catch(err => {
                console.error(err);
            })

        }

        handleSubmit = (event) => {
            event.preventDefault();

            const answersLength = this.state.questions.filter(question => {
                return question.userAnswers !== undefined
            }).length;
            const openEndedAnswersLength = Object.values(this.state.openEndedInput).filter(answer => {
                return answer != '';
            }).length
            
            if(this.state.questions.length === answersLength || openEndedAnswersLength === this.state.questions.length){
                const {
                    quizOwner,
                    quizType,
                    inputType,
                    whoToEmail,
                    questions,
                    categories,
                    openEndedInput

                } = this.state
                axios.post('/api/submit', {
                    quizOwner,
                    quizType,
                    inputType,
                    whoToEmail,
                    questions,
                    categories,
                    openEndedInput
            
                }).then( response => {
                    if(response.data === 'Email sent'){
                        toast.success('Test Completed')

                    }
                    
                }).catch(err => {
                    toast.error('Sorry there was an error')
                })

                
                
            }
            else{
                toast.error('Please answer all questions.')
                
            }

          


        }
        handleAnswer = (questionIndex, userAnswer, inputType) => {
            

                this.setState(prevState => {
                    let questions = this.state.questions.slice(0)
                    if(!questions[questionIndex].userAnswers || inputType !== 'chooseMultiple'){
                        questions[questionIndex].userAnswers = [];
                    }
                    if(questions[questionIndex].userAnswers.includes(userAnswer)){
                        questions[questionIndex].userAnswers = questions[questionIndex].userAnswers.filter(answer => answer !== userAnswer);
    
                    }
                    else{
                        questions[questionIndex].userAnswers.push(userAnswer);
                    }
                    return{
                        ...prevState,
                        questions: questions,
    
                    }
                })
            
           
        }
        handleOpenEndedInputChange = (value, questionIndex) => {
            
            this.setState( prevState => {
                console.log(this.state)
                let openEndedInput = prevState.openEndedInput;
                openEndedInput[questionIndex] = value;
                return{
                    ...prevState,
                    openEndedInput,
                }
            })
        }




        render(){

            const questions = this.state.questions ? this.state.questions.map((question, questionIndex) => {
               return(
                   <div key={questionIndex}>
                       <QuizCard
                        questionContent={question.questionContent}
                        answers={question.answers}
                        quizType={this.state.quizType}
                        inputType={this.state.inputType}
                        questionIndex={questionIndex}
                        categories={this.state.categories}
                        handleAnswer={this.handleAnswer}
                        />
                        {
                            this.state.inputType === 'openEnded' ?
                            <textarea
                                placeholder='Answer....'
                                value={this.state.openEndedInput[questionIndex]}
                                onChange={(event) => this.handleOpenEndedInputChange(event.target.value, questionIndex)}
                            >

                            </textarea> :
                            null
                        }
                   </div>
                   
               ) 
            }): null;

            return(
                <div>
                    {questions}
                
                    <button onClick={(event) => this.handleSubmit(event)}>
                        submit
                    </button>
                </div>
            )
        }
}

export default TakeQuiz;