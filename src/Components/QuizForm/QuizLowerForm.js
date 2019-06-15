import React, { Component } from 'react';
import { QuestionCard } from './QuestionCard';



class QuizLowerForm extends Component{

    constructor(){
        super();


        this.state = {
            quiz: {
                questions: [
                    {
                        questionContent: 'test comment',
                        answers: [
                            {
                                answerContent: 'this is a test answer',
                                isCorrect: true,
                            }
                        ]
                    }
                ],

                categories: [],
            },

            typesAreValid: false,
        }
    }
    

    // checkInputValid = () => {
    //     if(this.props.quizType && this.props.inputType){
            
    //     }
    // }


    handleQuestionChange = (content, index) => {
        console.log(index)
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
    // handleAnswerChange = () => {
    //     switch()
    // }
    handleAddAnswer = (questionIndex) => {
        this.setState((previousState) => {
            let questions = previousState.quiz.questions.slice(0);
            questions[questionIndex]['answers'] = [
                ...previousState.quiz.questions[questionIndex]['answers'],
                 {
                     answerContent: '',

                 }
                ];
            
            return{
                ...previousState,
                quiz: {
                    ...previousState.quiz,
                    questions: questions,
                    
                }
            }
        })

    }

    
   

    // quizTypeSpecificHead = (quizType) => {
    //     let quizTypeSpecificJsx;
    //     switch(quizType){
    //         case'sorted':
    //             quizTypeSpecificJsx = (
    //                 <div>
    //                     categories
    //                     <input type='text'/>
    //                 </div>
    //             )
    //             break;
    //         case 'grade':
    //             break;
    //         case 'survey':
    //             break;
    //     }
    //     return(
    //         <div>
    //             <h1>{quizType}</h1>
                
    //             {quizTypeSpecificJsx}
    //         </div>
    //     )
    // }
    formConstructor = (quizType, inputType, questions) => {
        console.log(this.props, 'props')

        if(questions){
            
            return(
                <div>
                    {/* {this.quizTypeSpecificHead(quizType)} */}

                    {questions.map((question, index) => {
                        return(
    
                            <div key={index}>
                                <QuestionCard  
                                    questionId={index} 
                                    quizType={quizType} 
                                    inputType={inputType} 
                                    handleQuestionChange={this.handleQuestionChange} 
                                    handleAddAnswer={this.handleAddAnswer}
                                    answers={this.state.quiz.questions[index].answers}

                                    />
                            </div>
                            
                        )
                    })}
                </div>
            )
        }else{
            return null;
        }
    }


    handleAddQuestion = () => {
        this.setState((prevState) => {
            return(
                {
                    ...prevState,
                    quiz :{
                        quizType: this.props.quizType,
                        inputType: this.props.inputType,
                        questions: [
                            ...prevState.quiz.questions,
                            {
                                questionContent: '',
                                answers: [],

                            }
                        ]
                        
                    }
                }
            )
        })
    }
    incrementId = () => {

    }

    

    
    render(){
        console.log(this.state)
        
        return(
            <div>
                {this.formConstructor(this.props.quizType, this.props.inputType, this.state.quiz.questions)}
                {this.state.typesAreValid ? this.questions() : null}
                {/* {this.props.inputType ? this.formMaker()[this.props.quizType][this.props.inputType]: null } */}
                <button onClick={() => this.handleAddQuestion()}>
                    add question
                </button>
            </div>
        )
    }

}


export default QuizLowerForm;