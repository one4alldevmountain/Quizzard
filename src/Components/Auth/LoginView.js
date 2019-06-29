import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Login.scss';


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

  handleLogin = (event) => {
    event.preventDefault();

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
      <div>
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
                <button className="register-btn">Login</button>
                 

                  <div className="divider"></div>

                  <Link className="sign-up-link" to="/Register">
                    New to Quizzard? Create an Aoount.
                  </Link>

                </div>
              </div>
            </form>
          </section>
        </div>
      </div>)
  }
}



function mapStateToProps(state){
      return state;
  }




  export default connect(mapStateToProps, {updateUser})(Login);