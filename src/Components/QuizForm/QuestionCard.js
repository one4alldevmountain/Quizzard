import React from 'react';





const openEnded = ( quizType, questionIndex, handleChangeCb) => {
    return(
        <div>
        </div>
    )
}
const chooseMultiple = ( quizType, questionIndex, handleChangeCb) => {
    return(
        <div>
            <button>add answer</button>
        </div>
    )
}
const boolean = ( quizType, questionIndex, handleChangeCb) => {
        return(
            <div>
                
            </div>
        )
}
    // const multipleChoice = ( quizType, questionIndex, callBack, answers) => {
    //     let quizTypeDependantJsx;
    //     const mappedAnswers = answers.map( (answer, index) => {
    //         console.log(answer)
    //         if(quizType === 'graded'){
    //             quizTypeDependantJsx = <input 
    //                                         type='radio' 
    //                                         name={questionIndex} 
    //                                         value={index}

                                            
    //                                         />;
    //         }
    //         // else if(quizType === 'sorted'){
    //         //     quizTypeDependantJsx = <option>{}</option>
    //         // }
    //         return (
    //             <div key={index}>
    //                 <input 
    //                     type='text' 
    //                     value={answer.answerContent} 
    //                     onChange={(event) => callBack({
    //                         questionIndex,
    //                         answerIndex: index,
    //                         newAnswer: event.target.value,
    //                     })}
    //                     />
    //                     <div 
    //                         onChange={e => {

    //                         }}>

    //                         {quizTypeDependantJsx}
    //                     </div>
    //                 {/* {quizType == 'sorted' ?<select>{quizTypeDependantJsx}</select>} */}
                    
    //             </div>
    //         )
    //     })

    //     return(
    //         <div>
    //             {mappedAnswers}
    //             <button onClick={() => callBack({
    //                 questionIndex,
    //                 })}>add answer
    //             </button>
    //         </div>
    //     )
    // }
    const multipleChoice = ( quizType, questionIndex, callBack, answers, categories) => {


    }


    const displayAnswers = (options = {
            answers: [],
            categories: [],
            questionIndex: null,
            addAnswerCb: null,
            changeAnswerCb: null,
            quizType: '',
            inputType: '',
        }) => {
            console.log(options)
        const correctInput = (quizType, inputType, value) => {
            console.log(inputType)
            switch(quizType){
                case 'graded':
                    if(inputType === 'chooseMultiple'){
                        return(
                            <input
                            type='checkbox'
                            name='correctAnswer'
                            value={value}
                            />
                        )
                    }
                    else{
                        return(
                            <input 
                                type='radio'
                                name='correctAnswer'
                                value={value}
                                />
                        )

                    } 
                case 'sorted':
                    console.log(options.categories)
                    const  categoryOptions = options.categories.map(category => {
                        return(
                            <option value={category}>
                                {category}
                            </option>
                        )
                    })

                    return(
                        <select>
                            <option>select a category</option>
                            {categoryOptions}
                        </select>
                    )
                case 'survey':
                    return(
                        null
                    )
            }

        }

        const mappedAnswers = options.answers.map((answer, index) => {
            return(
                <div key={index}>
                    <input 
                        onChange={e =>  options.changeAnswerCb(e.target.value, options.questionIndex, index)}
                        type='text'
                        placeholder='enter answer here'
                        value={answer.answerContent}
                        />
                    {correctInput(options.quizType, options.inputType, answer.answerContent,)}

                </div>

            )
        })
        
        const button = (inputType) => {
            if(inputType === 'multipleChoice' || inputType === 'chooseMultiple'){
                return(
                    <button onClick={() => options.addAnswerCb(options.questionIndex)}>add answer</button>
                )
            }
            return null;
        }
        return (
            <div>
                {mappedAnswers}
                {button(options.inputType)}
                
            </div>
        )

    }
    
     





export const QuestionCard = props => {
    const inputTypes = {
        boolean: boolean( props.quizType, props.questionIndex, props.handleQuestionChange, props.answers),
        multipleChoice: multipleChoice( props.quizType, props.questionIndex, props.handleAddAnswer, props.answers),
        openEnded: openEnded( props.quizType, props.questionIndex, props.handleAddAnswer, props.answers),
        chooseMultiple: chooseMultiple( props.quizType, props.questionIndex, props.handleQuestionChange, props.answers),
    }

    return(
        <div>
            <div>
                <textarea placeholder='question' onChange={ (event) =>  props.handleQuestionChange(event.target.value, props.questionIndex)}/>
            </div>
            {console.log(props)}
            {displayAnswers({
                answers: props.answers,
                categories: props.categories,
                questionIndex: props.questionIndex,
                addAnswerCb: props.handleAddAnswer,
                changeAnswerCb: props.handleAnswerChange,
                inputType: props.inputType,
                quizType: props.quizType,
                
                })}
            {/* {props.inputType ? inputTypes[props.inputType] : null} */}

        </div>
    )
}
