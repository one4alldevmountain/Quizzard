import React, { Component } from 'react';
import './Home.scss';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import axios from 'axios';



class Home extends Component {
    constructor(props) {
         super(props);
     
         this.state = {
             quizzes: [],      
         };
       }

       componentDidMount(){
           if(this.props.match.params.urlextension){

               toast(`Quiz Pin: ${this.props.match.params.urlextension}`, {autoClose: false, draggable: false, closeOnClick: false})
           }
           this.getQuizzes(this.props._id);
       }

       getQuizzes = (id) => {
            axios.get(`/api/quizzes/${id}`).then(res => {
                this.setState({quizzes: res.data});
            })
       }


render (){

    const quizzes = this.state.quizzes.map(quiz => {
        return(
            <div className='quiz-card' onClick={() => this.props.history.push(`/quiz/${quiz.urlExtension}`)}>
                <h2>{quiz.quizName}</h2>
                <p>{quiz.questions.length} Questions</p>
                <p>Quiz Type: {quiz.quizType}</p>
                <p>Quiz Pin: {quiz.urlExtension}</p>
            </div>
        )
    })
    return (
        <div>
            <div>
        
            </div>
            <div className='my-quizzes'>
                <div className='divider'>
                    <h1>My quizzes</h1>
                    <button onClick={() => this.props.history.push('/form')}>Create quiz</button> 
                </div>
                
                <div className='quiz-container'>
                    {quizzes}   
                </div>
            </div>
        </div>
    );

}

}


const mapStateToProps = (reduxState) => {
  const {
      _id,
  } = reduxState;
  return{
      _id,
  }
}

export default connect(mapStateToProps)(Home) 