import React from "react";
import logo1 from "../images/logo1.png";
import "./Landing.scss";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { validateEmail } from '../utils/validateEmail';

var Landing = props => {
  return (
      <div>
    <div className="card">
      <center>
        <img className="logo" src={logo1} alt="logo" />
      </center>
      <div className="landing-container">
          <h3>What would you like to do?</h3>
        <div className="landing-Buttons">
          <Link to="/Pin" className="btn-1">
            Take Quiz
          </Link>
          <div className="divider"/>
    {console.log(props)}
          {props.email === 'guest' ? 
          <Link to="/Register" className="btn-1">
            Make Quiz
          </Link>:
          <Link to="/home" className="btn-1">
            Make Quiz
          </Link>
        }
          
        </div>
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  console.log(reduxState)
  const {
      email,
  } = reduxState;
  return{
      email,
  }
}

export default connect(mapStateToProps)(Landing);