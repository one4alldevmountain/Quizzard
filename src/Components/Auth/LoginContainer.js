import React, { Component } from 'react';
import axios from "axios";
import LoginView from './LoginView';
import './Login.scss';



class Login extends Component {
  

  loginUser = (username, password) => {
      console.log('loginUser')
    const user = {
      username,
      password
    };
    this.setState({
      error: ""
    });

    if (username !== "" && password !== "") {
      axios.post("/login", user)
        .then(response => {
            console.log('response',response.data)
          this.props.history.push("/Homepage");
        })
        .catch(err => console.log(err));
    } 
  };

  render() {
      return <LoginView loginUser={this.loginUser} />
  }
}


export default Login;