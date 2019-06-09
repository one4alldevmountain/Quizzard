import React, { Component } from 'react';



class QuizLowerFormConditional extends Component{

    constructor(){
        super();
    }



    conditionalForm = () => {
        return(
            <div>
                {
                    // console.log(this.props)
                    console.log({
                    true: 'hi',
                    false: 'low',
                }[!this.props.inputType && !this.props.quizType])
                }
            </div>
        )
    }

    render(){

        return(
            <div>
                {this.conditionalForm()}
            </div>
        )
    }

}


export default QuizLowerFormConditional;