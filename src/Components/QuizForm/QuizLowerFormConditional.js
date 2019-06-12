import React, { Component } from 'react';



class QuizLowerFormConditional extends Component{

    constructor(){
        super();


        this.state = {
            amountOfQuestions: 2,
            questions: [1],
            categories: [],
            
            typesAreValid: false,
        }
    }
    

    // checkInputValid = () => {
    //     if(this.props.quizType && this.props.inputType){
            
    //     }
    // }

    formMaker = ( ) => {

        return(

            {
               boolean: {
                   graded: 'graded trueFalse', 
                   sorted: 'Sorted truefalse',
                   survey: 'survey truefalse',
               },
               multipleChoice: {
                   graded: 'graded multiplechoice', 
                   sorted:'sorted multiplechoice',
                   survey: ' survey multiplechoice',
               },
               openEnded: {
                   openEnded:'openEnded',
               },
               fillInTheBlank: {
                   graded:'Graded', 
                   sorted:'Sorted',
                   survey:'Survey',
               },
               chooseMultiple: {
                   graded:'Graded', 
                   sorted:'Sorted',
                   survey:'Survey',
               },
       
           }
        )
    }

    formConstructor = (quizType, inputType, questions) => {
        if(questions){
            return(
                questions.map(question => {
                    return(

                        <div>
                            <input type='text'/>
                        </div>
                    )
                })
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
                    questions: [
                        ...prevState.questions,
                        {}
                    ]
                }
            )
        })
    }

    

    
    render(){
        
        return(
            <div>
                {this.formConstructor(null, null, this.state.questions)}
                {this.state.typesAreValid ? this.questions() : null}
                {this.props.inputsAreValid ? this.formMaker()[this.props.inputType][this.props.quizType] : null }
                <button onClick={() => this.handleAddQuestion()}>
                    add question
                </button>
            </div>
        )
    }

}


export default QuizLowerFormConditional;