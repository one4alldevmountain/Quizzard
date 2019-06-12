import React from 'react';
import HeaderView from '../Header/HeaderView';
import { Link } from 'react-router-dom';



const Home = (props) => {
    return (
        <div>
            <HeaderView />


            <div className="home-top">
                <div className="user-info">

                </div>
                <div className="quiz-btns">
                        <Link to="/Search">Find</Link>
                        <Link to="/Form">Create</Link>
                </div>

            </div>
        </div>
    );
}


export default Home;

