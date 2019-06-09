import React, { Component } from 'react';
import QuizLowerFormConditional from './QuizLowerFormConditional';



class QuizFormContainer extends Component{



    constructor(){
        super();
        
        this.state = {
            
            whoToEmail: [],
            quizType: '',
            inputType: '',



        }
    }
    

    handleUpperTypeChange = (value, whatToUpdate) => {
        this.setState({
            [whatToUpdate]: value,
        })
    }


    render(){
        return(
            <div>
                <label>
                    Test Type
                    <select value={this.state.quizType} onChange={event => this.handleUpperTypeChange(event.target.value, 'quizType' )}>
                        <option value="graded">Graded</option>
                        <option value="sorted">Sorted</option>
                        <option value="survey">Survey</option>
                    </select>
                </label>
                <label>
                Input Type
                <select value={this.state.inputType} onChange={event => this.handleUpperTypeChange(event.target.value, 'inputType' )}>
                    <option value="boolean">True/False</option>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="chooseMultiple">Choose Multiple</option>
                    <option value="fillInTheBlank">Fill in the blank</option>
                    <option value="openEnded">Open Ended</option>
                </select>
                </label>
                
                {JSON.stringify(this.state)};

                <div>
                    upperForm
                </div>
                <hr/>
                <div>
                    <QuizLowerFormConditional 
                        whoToEmail={this.state.whoToEmail}
                        quizType={this.state.quizType}
                        inputType={this.state.inputType}
                        />

                </div>
            </div>
        )
    }

}


export default QuizFormContainer;