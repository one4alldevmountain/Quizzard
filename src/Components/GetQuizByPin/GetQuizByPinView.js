import React, { Component } from 'react';
import './GetQuizByPin.scss';
import { toast } from 'react-toastify';

class GetQuizByPin extends Component {

    constructor() {
        super();
        this.state = {pinInput: ''}
    }
    handlePinChange = (pin) => {
        this.setState({
            pinInput: pin,
        })
    }
    handleGetQuiz = (event) => {
        if(this.state.pinInput){
            this.props.history.push('/quiz/' + this.state.pinInput)

        }else{
            toast.error('Enter a pin to continue.')
        }
    }
    render() {
        return (
            <div className='center-elements'>
                <div className='pin-entry floating'>
                    <p>Enter Your Pin:</p>
                    <input
                        type="text"
                        value={this.state.pinInput}
                        onChange={(event) => { this.handlePinChange(event.target.value) }}
                    />
                    <br/>
                    <button
                        type='submit'
                        onClick={() => this.handleGetQuiz()}>Get Quiz
                    </button>
                </div>
            </div>
        );
    }
}

export default GetQuizByPin;