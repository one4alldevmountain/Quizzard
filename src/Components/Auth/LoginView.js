import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Login.scss';
import HeaderView from '../Header/HeaderView';


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
    console.log(this.state);
  }

  handleLogin = (event) => {
    event.preventDefault();

    if (
      this.state.username ||
      this.state.password
    ) {

      axios.post('http://localhost:7000/auth/login', {
        username: this.state.username,
        password: this.state.password,
      }).then(response => {
          this.props.updateUser(response.data.user.username)
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
      <div>
        <HeaderView />
        <div className="login-form-parent-div">
          <section className="card">

            <center><Link to="/">
              <img className="loginpage-logo" src={logo1} alt="logo" />
            </Link></center>
            <form
              className="login-form"
              onSubmit={event => this.handleLogin(event)}
            >
              <div className="input-section">
                <div className="username">
                  <div className="username-icon">
                    <MaterialIcon icon="person" color="gray" />
                  </div>
                  <input
                    className="username-input"
                    placeholder="Username"
                    type="text"
                    onChange={event =>
                      this.handleInputChange(event.target.value, "username")
                    }
                  />
                </div>

                <div className="password">
                  <div className="password-icon">
                    <MaterialIcon icon="vpn_key" color="gray" />
                  </div>

                  <input
                    className="password-input"
                    placeholder="Password"
                    type="password"
                    onChange={event =>
                      this.handleInputChange(event.target.value, "password")
                    }
                  />
                </div>
           
                <div className="loginpage-buttons">
                  
                  <Link className="login-btn" to="/Register">
                    Sign Up
                  </Link>

                  <div className="divider"></div>

                  <button className="register-btn">Login</button>

                </div>
              </div>
            </form>
          </section>
        </div>
      </div>)
  }
}



function mapStateToProps(state){
    console.log('this is redux store', state)
      return state;
  }




  export default connect(mapStateToProps, {updateUser})(Login);