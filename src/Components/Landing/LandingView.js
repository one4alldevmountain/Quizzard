import React from 'react';
import logo1 from '../images/logo1.png';
import './Landing.scss';
import { Link } from 'react-router-dom';



var Landing = (props) => {
    return (
        <div>
            <img 
            className="logo"
            src={logo1} 
            alt="logo"/>

            <div className="Buttons">
                <Link to="/Pin" className="btn-1">Take a Quiz</Link>
                <Link to="/Register" className="btn-1">Make a Quiz</Link>
            </div>

        </div>
    );
}



export default Landing;