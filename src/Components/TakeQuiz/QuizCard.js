import React from 'react';
import './TakeQuiz.scss';



const QuizCard = (props) => {


    const answerInput = (props, answerIndex) => {
        switch(props.inputType){
            case 'chooseMultiple':
                return(
                    <input
                        type='checkbox'
                        name={props.questionIndex}
                        value={answerIndex}
                        onChange={(event) => {props.handleAnswer(props.questionIndex, event.target.value, props.inputType)}}
                    />
                )

            case 'multipleChoice':
                return(
                    <input
                        type='radio'
                        name={props.questionIndex}
                        value={answerIndex}
                        onChange={(event) => {props.handleAnswer(props.questionIndex, event.target.value, props.inputType)}}
                    />
                )
            case 'boolean': 
                return(
                    <input
                        type='radio'
                        name={props.questionIndex}
                        value={answerIndex}
                        onChange={(event) => {props.handleAnswer(props.questionIndex, event.target.value, props.inputType)}}
                    />
                )
            case 'openEnded' :
            return null;
            default: return null;
        } 
    }
    const answers = props.answers.map((answer, index )=> {
        return(
            <div key={index}>
                <p>{answer.answerContent}{answerInput(props, index)}</p>
            </div>
        )
    })
    return(
        <div>
            <div className='question'>
                {props.questionContent}
            </div>
            <div className='answers'>
                {answers}
                
            </div>
        </div>
    )
}

export default QuizCard;