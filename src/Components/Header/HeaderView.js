import React from 'react';
import logo1 from '../images/logo1.png';
import { Link } from 'react-router-dom';
import './Header.scss';



export default function HeaderView() {
    return (
        <div className="header">
            <Link className='header' to='/'>
                <h1><i>Quizzard</i></h1>
            </Link>
        </div>
    )
}