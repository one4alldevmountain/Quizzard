import React from 'react';
import logo1 from '../images/logo1.png';
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
                console.log(props);
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
            <Link className='header' to='/'>
                <h1><i>Quizzard</i></h1>
            </Link>
            {props._id !== -1 ? <button onClick={() => handleLogout()}>Logout</button> : null}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    const {
        _id,
    } = reduxState;
    return{
        _id,
    }
}

export default connect(mapStateToProps, { updateUser })(withRouter(HeaderView));