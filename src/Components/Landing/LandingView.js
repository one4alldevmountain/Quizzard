import React from 'react';
import logo1 from '../images/logo1.png';
import './Landing.scss';




var Landing = (props) => {
    return (
        <div>
            <img 
            className="logo"
            src={logo1} 
            alt="logo"/>

            <div className="Buttons">
                <button className="btn-1">Take a Quiz</button>
                <button className="btn-1">Make a Quiz</button>
            </div>

        </div>
    );
}



export default Landing;