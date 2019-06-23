import React from 'react';



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
            <div>
                {props.questionContent}
            </div>
            <div>
                {answers}
                
            </div>
        </div>
    )
}

export default QuizCard;