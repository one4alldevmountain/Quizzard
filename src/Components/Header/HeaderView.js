import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import axios from 'axios';
import { updateUser } from '../../actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';


const HeaderView = (props) => {

    const handleLogout = () => {
        axios.get('/auth/logout').then(response => {
            if(response.data === 'logged out'){
                axios.get('/auth/userassign').then(response => {
                    props.updateUser(response.data);
                }).then(() => {
                    props.history.push('/')
                })
            }
        });
    }
    return (
        <div className="header">
            <Link className='link' to='/'>
                <h1>Quizzard</h1>
            </Link>
            {props._id !== -1 ? <button onClick={() => handleLogout()}>Logout</button> 
                :<Link to='/login'>
                    <button>Login</button>
                </Link>}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    const {_id} = reduxState;
    return{_id}
}

export default connect(mapStateToProps, { updateUser })(withRouter(HeaderView));