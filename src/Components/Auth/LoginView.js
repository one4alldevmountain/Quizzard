import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Login.scss';



const Login = (props) => {
    return (
        <div className="login-form">
            <div className="login-container">
                <Link to="/">
                    <img
                        className="login-logo"
                        src={logo1}
                        alt="logo" />
                </Link>

                <div className="login-inputs-btns">




                    <section className="login-input-section">
                        <div className="login-username">
                            <div className="login-username-icon">
                                <MaterialIcon icon="person" color="white" />
                            </div>
                            <input
                                className="login-username-input"
                                placeholder="Username"
                                type="text"

                            />
                        </div>

                        <div className="login-password">
                            <div className="login-password-icon">
                                <MaterialIcon icon="vpn_key" color="white" />
                            </div>
                            <input
                                className="login-password-input"
                                placeholder="Password"
                                type="password"
                            />
                        </div>
                    </section>




                    <div className="login-form-buttons">
                        <Link className="loginpage-btn" to="/Register" >
                            sign up
                        </Link>

                        <Link to="/Homepage" className="loginpage-btn" >
                            Login
                        </Link>
                    </div>


                </div>
            </div>


        </div>
    );
}



export default Login;