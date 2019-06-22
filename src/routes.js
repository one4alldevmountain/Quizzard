import React from 'react';
import LandingView from './Components/Landing/LandingView';
import GetQuizByPin from './Components/GetQuizByPin/GetQuizByPinView';
import RegisterView from './Components/Auth/RegisterView';
import LoginView from './Components/Auth/LoginContainer';
import HomeView from './Components/Home/HomeView';
import SearchView from './Components/Search/SearchView';
import QuizForm from './Components/QuizForm/QuizForm';
import { Switch, Route } from 'react-router-dom';





export default (
    <Switch>
       <Route component={LandingView} exact path="/" />
       <Route component={GetQuizByPin} path="/pin" />
       <Route component={RegisterView} path="/register" />
       <Route component={LoginView} path="/login" />
       <Route component={HomeView} path="/homepage" />
       <Route component={SearchView} path="/search" />
       <Route component={QuizForm} path="/form" />
    </Switch>

)

