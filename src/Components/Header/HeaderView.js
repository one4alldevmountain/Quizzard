import React from 'react';
import logo1 from '../images/logo1.png';
import './Header.scss';



export default function HeaderView() {
    return (
        <div className="header">
            <img 
            className="logo-header"
            src={logo1}
            />
            <h1>HEADER</h1>
        </div>
    )
}



