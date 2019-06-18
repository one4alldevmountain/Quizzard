import React from 'react';
import {
    boolean,
    multipleChoice,
    openEnded,
    chooseMultiple
} from './QuestionTypeFunctions'








export const QuestionCard = props => {
    const questionTypes = {
        boolean: boolean( props.quizType, props.questionId, props.handleQuestionChange, props.answers),
        multipleChoice: multipleChoice( props.quizType, props.questionId, props.handleAddAnswer, props.answers),
        openEnded: openEnded( props.quizType, props.questionId, props.handleAddAnswer, props.answers),
        chooseMultiple: chooseMultiple( props.quizType, props.questionId, props.handleQuestionChange, props.answers),
    }

    return(
        <div style={{'border': '2px black'}}>
            <div>
                <textarea placeholder='question' onChange={ (event) =>  props.handleQuestionChange(event.target.value, props.questionId)}/>
            </div>
            {props.inputType ? questionTypes[props.inputType] : null}

        </div>
    )
}
