import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Login.scss';



var Register = (props) => {
    return (
        <div>
            <Link to="/">
                <img
                    className="logo"
                    src={logo1}
                    alt="logo" />
            </Link>

            <div className="pin-input">
                <div className="auth-container">


                        <section className="register-form">

                            <div className="username">
                                <input
                                    className="username-input"
                                    placeholder="Username"
                                    type="text"
                                 
                                />
                            </div>

                            <div className="password">

                                <input
                                    className="password-input"
                                    placeholder="Password"
                                    type="password"
                                />
                            </div>
                          

                            <div className="buttons">
                                <Link className="register-button" to="/Register" >
                                    <p className="signup-text">sign up</p>
                                </Link>

                                <button className="login-button" >
                                    Login
                                </button>
                            </div>

                        </section>


                </div>
            </div>

        </div>
    );
}



export default Register;