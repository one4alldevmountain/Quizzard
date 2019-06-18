import React, { Component } from 'react';
import { QuestionCard } from './QuestionCard';



class QuizLowerForm extends Component{

    constructor(props){
        super(props);


        this.state = {
            quiz: {
                questions: [
                    {
                        questionContent: '',
                        answers: [
                            {
                                answerContent: '',
                            }
                        ]
                    }
                ],

            },

            // typesAreValid: false,
        }
        // this.constructStateSkeletonFromQuizType(props.quizType);
    }
    constructStateSkeletonFromQuizType = (quizType) => {
        
                switch(quizType){
                    case 'graded':
                        this.setState(prevState => {
                            return{
                                ...prevState,
                                questions: [
                                    {
                                        questionContent: '',
                                        answers: [
                                            {
                                                answerContent: '',
                                            }
    
                                        ],
                                        correctAnswers: [
    
                                        ],
    
                                    }
                                ]
                            }
                        })
                        break;
                    case 'survey':
                            this.setState(prevState => {
                                return{
                                    ...prevState,
                                    questions: [
                                        {
                                            questionContent: '',
                                            answers: [
                                                {
                                                    answerContent: '',
                                                }
        
                                            ],
                                            
        
                                        }
                                    ]
                                }
                            })
                        break;
                    case 'sorted':
                            this.setState(prevState => {
                                return{
                                    ...prevState,
                                    categories: [],
                                    questions: [
                                        {
                                            questionContent: '',
                                            category: '',
                                            answers: [
                                                {
                                                    answerContent: '',
                                                }
        
                                            ],
                                            
        
                                        }
                                    ]
                                }
                            })
                        break;
                }
            }
            // constructStateSkeletonFromQuizType = (quizType) => {
            //     switch(quizType){
            //         case 'graded':
            //             this.state = {
            //                 quiz: {
            //                     questions: [
            //                         {
            //                             questionContent: '',
            //                             answers: [
            //                                 {
            //                                     answerContent: '',
            //                                 }
            //                             ],
            //                             correctAnswers: [],
            //                         }
            //                     ],
                
            //                 },
            //             }
            //             break;
            //         case 'survey':
            //                 this.state = {
            //                     quiz: {
            //                         questions: [
            //                             {
            //                                 questionContent: '',
            //                                 answers: [
            //                                     {
            //                                         answerContent: '',
            //                                     }
            //                                 ],
            //                             }
            //                         ],
                    
            //                     },
            //                 }
            //             break;
            //         case 'sorted':
            //                 this.state = {
            //                     quiz: {
            //                         categories: [],
            //                         questions: [
            //                             {
            //                                 questionContent: '',
            //                                 category: '',
            //                                 answers: [
            //                                     {
            //                                         answerContent: '',
            //                                     }
            //                                 ],
            //                                 correctAnswers: [],
            //                             }
            //                         ],
                    
            //                     },
            //                 }
            //             break
            //     }
            // }
    componentWillMount(){
        this.constructStateSkeletonFromQuizType(this.props.quizType)
    }
    componentWillReceiveProps(){
        console.log(this.props)
        this.constructStateSkeletonFromQuizType(this.props.quizType);
    }
    

    // checkInputValid = () => {
    //     if(this.props.quizType && this.props.inputType){
            
    //     }
    // }


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






    handleAddAnswer = (
        options = {
            questionIndex: null,
            answerIndex: null,
            newAnswer: '',
            quizType: '',
            isCorrect: false,
            category: '',

        }
        ) => {
            const {
                questionIndex,
                newAnswer,
                quizType,
                isCorrect,
                category,
                answerIndex
            } = options;


            
            if(newAnswer){
                this.setState((previousState) => {
                    let questions = previousState.quiz.questions.slice(0);
                    questions[questionIndex]['answers'][answerIndex] = {
                        ...previousState.quiz.questions[questionIndex]['answers'][answerIndex],
                        answerContent: newAnswer,
                        
                    };
                        
                
                switch(quizType){
                    case 'survey': 
                    break;

                    case 'graded': 
                    questions[questionIndex]['isCorrect'] = isCorrect;
                    break;
                    case 'sorted':
                        questions[questionIndex]['category'] = category;
                        break;
                    }
                    return{
                        ...previousState,
                        quiz: {
                            ...previousState.quiz,
                            questions: questions,
                            
                        }
                    }
                    
                })
                }else{

                    this.setState((previousState) => {
                        let questions = previousState.quiz.questions.slice(0);
                        questions[questionIndex]['answers'] = [
                            ...previousState.quiz.questions[questionIndex]['answers'],
                            {
                                answerContent: newAnswer,
                                
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


    }


    
   

  
    formConstructor = (quizType, inputType, questions) => {

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


    handleAddQuestion = (quizType, inputType) => {
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

    

    
    render(){
        
        return(
            <div>
                {this.formConstructor(this.props.quizType, this.props.inputType, this.state.quiz.questions)}
                {JSON.stringify(this.state)}
                {/* {this.props.inputType ? this.formMaker()[this.props.quizType][this.props.inputType]: null } */}
                <button onClick={() => this.handleAddQuestion()}>
                    add question
                </button>
            </div>
        )
    }

}


export default QuizLowerForm;