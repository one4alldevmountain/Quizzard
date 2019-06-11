import React from 'react';
import logo1 from '../images/logo1.png';
import { Link } from 'react-router-dom';
import './Takerpin.scss';



var TakerpinView = (props) => {
    return (
        <div>
            <Link to="/">
                <img 
                className="logo"
                src={logo1} 
                alt="logo"/>
            </Link>
           
            <div className="pin-input">
                    <p className="pin-title">Enter Your Pin:</p>
                    <input
                    className="pin-input"
                    type="pin"
                    />
            </div>

        </div>
    );
}



export default TakerpinView;