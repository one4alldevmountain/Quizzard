import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import './Auth.scss';


class Login extends Component {


  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    }
  }


  handleInputChange = (value, valueTochange) => {
    this.setState({ [valueTochange]: value });
  }

  handleLogin = () => {

    if (
      this.state.username ||
      this.state.password
    ) {

      axios.post('/auth/login', {
        username: this.state.username,
        password: this.state.password,
      }).then(response => {
          this.props.updateUser(response.data.user)
          this.props.history.push('/home')
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
              Log into Quizzard
            </h2>
            
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
              <button onClick={()=> this.handleLogin()}>Login</button>
              <div className='auth-or-option'>
                <div/><p>or</p><div/>
              </div>
              <button onClick={() => this.props.history.push('/register')}>Register</button>
            </div>
          
        </div>
      </div>
    )
  }
}



function mapStateToProps(state){
      return state;
  }




  export default connect(mapStateToProps, {updateUser})(Login);