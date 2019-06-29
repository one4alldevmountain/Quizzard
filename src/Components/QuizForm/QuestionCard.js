import React from 'react';
import './QuestionCard.scss';








    const displayAnswers = (options = {
            answers: [],
            categories: [],
            questionIndex: null,
            addAnswerCb: null,
            addCorrectAnswerCb: null,
            addAnswerCategoryCb: null,
            changeAnswerCb: null,
            quizType: '',
            inputType: '',
        }) => {
        const correctInput = (quizType, inputType, answerIndex) => {
            switch(quizType){
                case 'graded':
                    if(inputType === 'chooseMultiple'){
                        return(
                            <div>

                                <input
                                type='checkbox'
                                name={'correctAnswer' + options.questionIndex}
                                value={answerIndex}
                                onChange={() => options.addCorrectAnswerCb(options.questionIndex, answerIndex, options.inputType)}
                                />
                                <span>{answerIndex}</span>
                            </div>
                        )
                    }
                    else{
                        return(
                            <input 
                                type='radio'
                                name={'correctAnswer' + options.questionIndex}
                                value={answerIndex}
                                onChange={() => options.addCorrectAnswerCb(options.questionIndex, answerIndex, options.inputType)}
                                />
                        )

                    } 
                case 'sorted':
                    const  categoryOptions = options.categories.map(category => {
                        return(
                            <option value={category}>
                                {category}
                            </option>
                        )
                    })

                    return(
                        <select value={options.answers.category} onChange={(event) => options.addAnswerCategoryCb(options.questionIndex, answerIndex, event.target.value )}>
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
                        className="answer-choice-input"
                        onChange={e =>  options.changeAnswerCb(e.target.value, options.questionIndex, index)}
                        type='text'
                        placeholder='enter answer here'
                        value={answer.answerContent}
                        readOnly={options.inputType === 'boolean'}
                        />
                    {correctInput(options.quizType, options.inputType, index,)}

                </div>

            )
        })
        
        const button = (inputType) => {
            if(inputType === 'multipleChoice' || inputType === 'chooseMultiple'){
                return(
                    <button 
                    className="add-answer-button"
                    onClick={() => options.addAnswerCb(options.questionIndex)}>
                    Add an Answer
                    </button>
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
        <div className="question-textarea-container">
            <div className="question-textarea-parent">
                <textarea 
                className="question-textarea"
                placeholder='question' onChange={ (event) =>  props.handleQuestionChange(event.target.value, props.questionIndex)}/>
            </div>
            {console.log(props)}
            {displayAnswers({
                answers: props.answers,
                categories: props.categories,
                questionIndex: props.questionIndex,
                addAnswerCb: props.handleAddAnswer,
                addAnswerCategoryCb: props.handleAddAnswerCategory,
                changeAnswerCb: props.handleAnswerChange,
                addCorrectAnswerCb: props.handleAddCorrectAnswer,
                inputType: props.inputType,
                quizType: props.quizType,

                
                })}
                <hr/>

        </div>
    )
}
