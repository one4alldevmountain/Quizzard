import React, { Component } from 'react';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.scss';
import HeaderView from '../Header/HeaderView';
import { homedir } from 'os';



class Home extends Component {
    constructor(props) {
         super(props);
     
         this.state = {
             user: ""      
         };
       }



render (){

    return (
        <div>
            <HeaderView />

            {/* <li>{this.props.user.username}</li> */}

            <div className="home-top">
                <div className="user-info">
                     <p className="user-name">{this.props.username}</p>
                </div>
                <div className="select-container">
                     {/* <select className="select-input">
                        <option value="Please choose an option.">Please choose an option</option>
                        <option value="Find a Quiz">Find a Quiz</option>
                        <option value="Make a Quiz">Make a Quiz</option>
                    </select> */}


                        <Link 
                        className="find-btn"
                        to="/Search">Find a Quiz</Link>
                        <Link 
                        className="create-btn"
                        to="/Form">Create a Quiz</Link>
                </div>

                   


            </div>
        </div>
    );

}

}

// function mapStateToProps(state){
//     return {
//          user: state.user
//     };
// }

// export default connect(mapStateToProps, {updateUser})(Home);

export default Home;