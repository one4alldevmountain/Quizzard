import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo1 from '../images/logo1.png';
import './Login.scss';



class Login extends Component{


    constructor(){
        super();


        this.state = {
            username: '',
            password: '',
        }
    }


    handleInputChange = (value, valueTochange) => {
        this.setState({[valueTochange]: value});
        console.log(this.state);
    }

    handleLogin = (event) => {
        event.preventDefault();

        axios.post('http://localhost:7000/auth/login', {
            username: this.state.username,
            password: this.state.password,
        }).then(response => {
            if(response.data.message = 'Logged In'){
                this.props.updateUser(response.data.user);
                this.props.history.push('/home')
            }
        }).catch(err => {
            toast.error('Failed to log in')
        })
    }



    render(){
        
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
                                <form onSubmit={event => this.handleLogin(event)}>

                                    <div className="username">
                                        <input
                                            className="username-input"
                                            placeholder="Username"
                                            type="text"
                                            onChange={event => this.handleInputChange(event.target.value, 'username')}
                                        
                                        />
                                    </div>
        
                                    <div className="password">
        
                                        <input
                                            className="password-input"
                                            placeholder="Password"
                                            type="password"
                                            onChange={event => this.handleInputChange(event.target.value, 'password')}
                                        />
                                    </div>
                                
        
                                    <div className="buttons">
                                        <button 
                                            className="login-button" 
                                            type='submit'
                                        >
                                            Login
                                        </button>

                                        <p>or</p>

                                        <Link className="register-button" to="/Register" >
                                            <p className="signup-text">sign up</p>
                                        </Link>
        
                                    </div>
                                </form>
    
    
                            </section>
    
    
                    </div>
                </div>
    
            </div>
        );
    }
}



export default connect(null, { updateUser })(Login)