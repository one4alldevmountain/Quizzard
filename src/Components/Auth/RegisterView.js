import React, { Component } from 'react';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png';
import './Register.scss';
import { validateEmail } from '../utils/validateEmail';


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
    console.log(this.state);
  }

  handleRegister = (event) => {
    event.preventDefault();

    if (
      this.state.username ||
      this.state.password ||
      this.state.email
    ) {

      axios.post('http://localhost:7000/auth/register', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }).then(response => {
        if (response.data.message = 'Registered and Logged In') {
          this.props.updateUser(response.data.user)
          this.props.history.push('/Login')
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
      <div>
        <div className="register-form-parent-div">
          <section className="card">

            <center><Link to="/">
              <img className="register-logo" src={logo1} alt="logo" />
            </Link></center>
            <form
              className="register-form"
              onSubmit={event => this.handleRegister(event)}
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
                <div className="email">
                  <div className="email-icon">
                    <MaterialIcon icon="mail" color="gray" />
                  </div>
                  <input
                    className="email-input"
                    placeholder="Email Address"
                    type="text"
                    onChange={event =>
                      this.handleInputChange(event.target.value, "email")
                    }
                  />
                </div>

                <div className="register-buttons">
                  <button 
                  onClick={this.handleRegister}
                  className="register-btn">Create account</button>

                  <Link className="login-link" to="/Login">
                    Already have an Account? Login
                  </Link>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>)
  }
}

export default connect(null, { updateUser })(Register)