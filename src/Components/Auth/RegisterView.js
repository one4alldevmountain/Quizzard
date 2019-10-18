import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import './Auth.scss';


class Register extends Component {


  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
    }
  }


  handleInputChange = (value, valueTochange) => {
    this.setState({ [valueTochange]: value });
  }

  handleRegister = (event) => {

    if (
      this.state.username ||
      this.state.password ||
      this.state.email
    ) {

      axios.post('/auth/register', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }).then(response => {
        if (response.data.message === 'Registered and Logged In') {
          this.props.updateUser(response.data.user)
          this.props.history.push('/home')
          toast.success('Registered and Logged in')
        }
      }).catch(err => {
        if (err.response) {
          const startIndex = err.response.data.indexOf('<pre>')
          const endIndex = err.response.data.indexOf('</pre>')
          toast.error(err.response.data.slice(startIndex + 5, endIndex))
        } else {
          toast.error('missing fields')
        }
      })
    }
    else {
      toast.error('Missing Fields')
    }

  }

  render() {

    return (
      <div className='center-elements'>
          <div className='auth-container'>
            <div className='auth-header'>
              <h2>
                Sign up
              </h2>
              <h3>
                It's quick and easy.
              </h3>
            </div>
            
            <div>
              <input
                placeholder="Username"
                type="text"
                onChange={event =>
                  this.handleInputChange(event.target.value, "username")
                }/>
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                onChange={event =>
                  this.handleInputChange(event.target.value, "password")
                }/>
            </div>
            <div>
              <input
                placeholder="Email Address"
                type="text"
                onChange={event =>
                  this.handleInputChange(event.target.value, "email")
                }/>
            </div>
            <div>
              <button onClick={this.handleRegister}>Create account</button>
              <div className='auth-or-option'>
                <div/><p>or</p><div/>
              </div>
              <button onClick={() => this.props.history.push('/login')}>Login</button>
            </div>
          </div>
      </div>)
  }
}

export default connect(null, { updateUser })(Register)