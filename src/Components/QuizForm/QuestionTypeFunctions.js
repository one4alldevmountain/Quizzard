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
        let quizTypeDependantJsx;
        const mappedAnswers = answers.map( (answer, index) => {
            if(quizType === 'graded'){
                quizTypeDependantJsx = <input type='radio' name={questionId} value={answer.answerContent}/>;
            }
            // else if(quizType === 'sorted'){
            //     quizTypeDependantJsx = <option>{}</option>
            // }
            return (
                <div key={index}>
                    <input type='text' value={answer.answerContent}/>
                    {quizTypeDependantJsx}
                    {/* {quizType == 'sorted' ?<select>{quizTypeDependantJsx}</select>} */}
                    
                </div>
            )
        })

        return(
            <div>
                {mappedAnswers}
                <button onClick={() => handleChangeCb(questionId)}>add answer</button>
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


