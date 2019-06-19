import React from 'react';




export const openEnded = ( quizType, questionId, handleChangeCb) => {
    return(
        <div>
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
export const boolean = ( quizType, questionId, handleChangeCb) => {
        return(
            <div>
                
            </div>
        )
}
    export const multipleChoice = ( quizType, questionIndex, callBack, answers) => {
        let quizTypeDependantJsx;
        const mappedAnswers = answers.map( (answer, index) => {
            console.log(answer)
            if(quizType === 'graded'){
                quizTypeDependantJsx = <input 
                                            type='radio' 
                                            name={questionIndex} 
                                            value={index}

                                            
                                            />;
            }
            // else if(quizType === 'sorted'){
            //     quizTypeDependantJsx = <option>{}</option>
            // }
            return (
                <div key={index}>
                    <input 
                        type='text' 
                        value={answer.answerContent} 
                        onChange={(event) => callBack({
                            questionIndex,
                            answerIndex: index,
                            newAnswer: event.target.value,
                        })}
                        />
                        <div 
                            onChange={e => {

                            }}>

                            {quizTypeDependantJsx}
                        </div>
                    {/* {quizType == 'sorted' ?<select>{quizTypeDependantJsx}</select>} */}
                    
                </div>
            )
        })

        return(
            <div>
                {mappedAnswers}
                <button onClick={() => callBack({
                    questionIndex,
                    })}>add answer
                </button>
            </div>
        )
    }  


