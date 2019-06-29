import React, { Component } from 'react';
import axios from 'axios';
import QuizCard from './QuizCard';
import { toast} from 'react-toastify';
import Modal from 'react-responsive-modal';
import { validateEmail } from '../utils/validateEmail';




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
                modalIsOpen: false,

                name: '',
                email: '',


            }
        }
        componentWillMount(){
            this.getQuiz(this.props.match.params.pin);
        }

        getQuiz = (urlExtention) => {
            axios.get('/api/quiz/' + urlExtention).then(res => {
                console.log(res.data)

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
            console.log(validateEmail(this.state.email))
            if(!validateEmail(this.state.email)){
                console.log('hit')
                toast.error('Please input a valid email')
                return;
            }
            

            const answersLength = this.state.questions.filter(question => {
                return question.userAnswers !== undefined
            }).length;
            const openEndedAnswersLength = Object.values(this.state.openEndedInput).filter(answer => {
                return answer != '';
            }).length
            
            if(this.state.questions.length === answersLength || openEndedAnswersLength === this.state.questions.length){
                const {
                    quizOwner,
                    quizName,
                    quizType,
                    inputType,
                    whoToEmail,
                    questions,
                    categories,
                    openEndedInput,
                    name,
                    email

                } = this.state
                axios.post('/api/submit', {
                    quizOwner,
                    quizName,
                    quizType,
                    inputType,
                    whoToEmail,
                    questions,
                    categories,
                    openEndedInput,
                    name,
                    email
            
                }).then( response => {
                    if(response.data === 'Email sent'){
                        toast.success('Completed')
                        this.props.history.push('/pin');

                    }
                    
                }).catch(err => {
                    toast.error('Sorry there was an error')
                })

                
                
            }
            else{
                toast.error('Please answer all questions.')
                this.handleCloseModal();
                
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
        handleOpenModal = () => {
            this.setState({modalIsOpen: true});
        }
        handleCloseModal = () => {
            this.setState({modalIsOpen: false});
        }
        handleBasicInputChange = (value, whatToChange) => {
            this.setState({
                [whatToChange]: value,
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

                    <h1>{this.state.quizName}</h1>
                    
                    <div>
                        {questions}

                    </div>
                
                    <button onClick={() => this.handleOpenModal()}>
                        submit
                    </button>


                    {/* modal */}
                    <Modal 
                        open={this.state.modalIsOpen} 
                        onClose={() => this.handleCloseModal()}
                        showCloseIcon={false}
                        focusTrapped={true}
                        closeOnOverlayClick={false}
                        >
                        <div>
                            <input 
                                type='text' 
                                placeholder='Name'
                                value={this.state.name}
                                onChange={(event) => this.handleBasicInputChange(event.target.value, 'name')}
                                />
                            <input 
                                type='text' 
                                placeholder='Email'
                                value={this.state.email}
                                onChange={(event) => this.handleBasicInputChange(event.target.value, 'email')}
                                />
                            <button
                                onClick={() => this.handleCloseModal()}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(event) => this.handleSubmit(event)}
                            >
                                Submit
                            </button>
                        </div>
                    </Modal>
                </div>
            )
        }
}

export default TakeQuiz;