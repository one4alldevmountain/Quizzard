import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Register.scss';



const Register = (props) => {
    return (
        <div className="register-form-parent-div">
            <section className="register-form-container">
                <Link to="/">
                    <img
                        className="register-logo"
                        src={logo1}
                        alt="logo" />
                </Link>

                    <div className="register-form">


                           <section className="input-section">
                                        <div className="username">
                                            <div className="username-icon">
                                               <MaterialIcon icon="person" color="white" />
                                            </div>
                                            
                                            <input
                                                className="username-input"
                                                placeholder="Username"
                                                type="text"
                                            
                                            /> 
                                        </div>

                                        <div className="password">
                                            <div className="password-icon">
                                                 <MaterialIcon icon="vpn_key" color="white"/>
                                            </div>
                                           
                                            <input
                                                className="password-input"
                                                placeholder="Password"
                                                type="password"
                                            />
                                        </div>
                                        <div className="email">
                                            <div className="email-icon">
                                               <MaterialIcon icon="mail" color="white"/>
                                            </div>
                                            
                                            <input
                                                className="email-input"
                                                placeholder="Email Address"
                                                type="text"
                                            />
                                        </div>
                           </section>

                     

                                <div className="register-buttons">
                                    <Link className="register-btn" to="/Register" >
                                        sign up
                                    </Link>

                                    <Link className="register-btn" to="/Login">
                                        Login
                                    </Link>
                                </div>

                        


                    </div>
               
            </section>
           

        </div>
    );
}



export default Register;