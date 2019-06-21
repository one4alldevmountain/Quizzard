import React from 'react';








    const displayAnswers = (options = {
            answers: [],
            categories: [],
            questionIndex: null,
            addAnswerCb: null,
            addCorrectAnswerCb: null,
            changeAnswerCb: null,
            quizType: '',
            inputType: '',
        }) => {
        const correctInput = (quizType, inputType, answerIndex) => {
            console.log(inputType)
            switch(quizType){
                case 'graded':
                    if(inputType === 'chooseMultiple'){
                        return(
                            <div>

                                <input
                                type='checkbox'
                                name='correctAnswer'
                                value={answerIndex}
                                />
                                <span>{answerIndex}</span>
                            </div>
                        )
                    }
                    else{
                        return(
                            <input 
                                type='radio'
                                name='correctAnswer'
                                value={answerIndex}
                                onChange={() => options.addCorrectAnswerCb(options.questionIndex, answerIndex, options.inputType)}
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
                    {correctInput(options.quizType, options.inputType, index,)}

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
                addCorrectAnswerCb: props.handleAddCorrectAnswer,
                inputType: props.inputType,
                quizType: props.quizType,
                
                })}

        </div>
    )
}
