import React, { Component } from 'react';
import logo1 from '../images/logo1.png';
import { Link } from 'react-router-dom';
import './GetQuizByPin.scss';



class GetQuizByPin extends Component{

    constructor(){
        super();


        this.state = {
            pinInput: '',

        }
    }


    handlePinChange = (pin) => {
        this.setState({
            pinInput: pin,
        })
    }
    handleSubmitPin = (event) => {
        event.preventDefault();


        this.props.history.push('/quiz/' + this.state.pinInput)
    }



    render(){

        return (
            <div>
                <Link to="/">
                    <img 
                    className="logo"
                    src={logo1} 
                    alt="logo"/>
                </Link>
               
                <div className="pin-input">
                        <p className="pin-title">Enter Your Pin:</p>
                        <input
                        className="pin-input"
                        type="text"
                        value={this.state.pinInput}
                        onChange={ (event) => {this.handlePinChange(event.target.value)}}
                        />
                        <button 
                        type='submit'
                        onClick={(event) => this.handleSubmitPin(event)}
                        >
                            Submit
                        </button>
                </div>
    
            </div>
        );
    }
}



export default GetQuizByPin;