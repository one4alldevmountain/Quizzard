import React from "react";
import "./Landing.scss";
import { connect } from 'react-redux';

var Landing = props => {
  const makeQuizUrl = props.email === 'guest' ? '/Register' : '/home';
  return (
      <div className='landing-container'>
        <div className='landing-div left' onClick={() => props.history.push('/Pin')}>
            <h2>Take Quiz</h2>
        </div>
        <div className='landing-div right' onClick={() => props.history.push(makeQuizUrl)}>
              <h2>Make Quiz</h2>
        </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  const {
      email,
  } = reduxState;
  return{
      email,
  }
}

export default connect(mapStateToProps)(Landing);