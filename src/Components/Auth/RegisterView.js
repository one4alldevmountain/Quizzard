import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Register.scss';


class Register extends Component{


    constructor(){
        super();

        this.state = {
            username: '',
            password: '',
            email: '',
        }
    }


    handleInputChange = (value, valueTochange) => {
        this.setState({[valueTochange]: value});
        console.log(this.state);
    }

    handleRegister = (event) => {
        event.preventDefault();

        if(
            this.state.username ||
            this.state.password ||
            this.state.email
        ) {

            axios.post('http://localhost:7000/auth/register', {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
            }).then(response => {
                if(response.data.message = 'Registered and Logged In'){
                    this.props.updateUser(response.data.user)
                    this.props.history.push('/home')
                }
            }).catch(err => {
                if( err.response){
                    const startIndex = err.response.data.indexOf('<pre>')
                    const endIndex = err.response.data.indexOf('</pre>')
                    toast.error(err.response.data.slice(startIndex + 5,endIndex))
                }else{
                    toast.error('missing fields')
                }
            })
        }
        else{
            toast.error('Missing Fields')
        }

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

                                <form onSubmit={event => this.handleRegister(event)}>

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
                                    <div className="email">
                                        <input
                                            className="email-input"
                                            placeholder="Email Address"
                                            type="text"
                                            onChange={event => this.handleInputChange(event.target.value, 'email')}
                                        />
                                    </div>
        
                                    <div className="buttons">
                                            <button className="register-button signup-text">Create account</button>
                                        <p>or</p>
        
                                        <Link className="login-button" to="/Login">
                                            <p className="Login-text">Login</p>
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



export default connect(null, { updateUser })(Register)