import React from 'react';




export const openEnded = ( quizType, questionId, handleChangeCb) => {
    return(
        <div>
        </div>
    )
}
    export const boolean = ( quizType, questionId, handleChangeCb) => {
        return(
            <div>
                
            </div>
        )
    }
    export const multipleChoice = ( quizType, questionId, handleChangeCb, answers) => {
        const mappedAnswers = answers.map( (answer, index) => {
            return (
                <div key={index}>
                    {answer.answerContent}<input type='radio' value={answer}/>
                </div>
            )
        })

        return(
            <div>
                {mappedAnswers}
                <button>add answer</button>
            </div>
        )
    }  
    export const chooseMultiple = ( quizType, questionId, handleChangeCb) => {
        return(
            <div>
                <button>add answer</button>
            </div>
        )
    }


