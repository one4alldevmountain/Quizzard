import React from 'react';
import {
    boolean,
    multipleChoice,
    openEnded,
    chooseMultiple
} from './QuestionTypeFunctions'








export const QuestionCard = props => {
    const questionTypes = {
        boolean: boolean,
        multipleChoice: multipleChoice,
        openEnded: openEnded,
        chooseMultiple: chooseMultiple
    }

    return(
        <div style={{'border': '2px black'}}>
            <div>
                <textarea placeholder='question' onChange={ (event) =>  props.handleQuestionChange(event.target.value, props.questionId)}/>
            </div>
            {console.log('questioncard',props)}
            {props.inputType ? questionTypes[props.inputType]( null, props.questionId, props.handleQuestionChange, props.answers) : null}

        </div>
    )
}
