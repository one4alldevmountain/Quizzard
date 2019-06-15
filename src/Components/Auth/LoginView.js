import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Login.scss';







var Register = ({ loginUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


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
                                onChange={(e) => {setUsername(e.target.value)}}
                                value={username}
                                className="username-input"
                                placeholder="Username"
                                type="text"

                            />
                        </div>

                        <div className="password">

                            <input
                                onChange={(e) => {setPassword(e.target.value)}}
                                value={password}
                                className="password-input"
                                placeholder="Password"
                                type="password"
                            />
                        </div>


                        <div className="buttons">
                            <Link className="register-button" to="/Register" >
                                sign up
                            </Link>

                            <button 
                            onClick={() => {loginUser(username,password)}}
                            to="/Homepage" 
                            className="login-button" >
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