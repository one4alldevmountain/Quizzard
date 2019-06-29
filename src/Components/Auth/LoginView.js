import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
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
            <div className="login-form">
                <div className="login-container">

                    <Link to="/">
                        <img
                            className="login-logo"
                            src={logo1}
                            alt="logo" />
                    </Link>
        
                    <div className="login-inputs-btns">
                        <div className="auth-container">
        
        
                                <section className="login-input-section">
                                    <form onSubmit={event => this.handleLogin(event)}>

                                        <div className="login-username">
                                            <div className="login-username-icon">
                                                <MaterialIcon icon="person" color="white" />
                                            </div>
                                            <input
                                                className="login-username-input"
                                                placeholder="Username"
                                                type="text"
                                                onChange={event => this.handleInputChange(event.target.value, 'username')}
                                            
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
                                                onChange={event => this.handleInputChange(event.target.value, 'password')}
                                            />
                                        </div>
                                    
            
                                        <div className="login-form-buttons">
                                            <button 
                                                className="loginpage-btn" 
                                                type='submit'
                                            >
                                                Login
                                            </button>

                                            <p>or</p>
                                            

            
                                            <Link className="" to="/Register" >
                                                <p>sign up</p>
                                            </Link>
                                        </div>
                                    </form>
        
        
                                </section>
                </div>
            </div>
                </div>
    
            </div>
        );
    }
}



export default connect(null, { updateUser })(Login)