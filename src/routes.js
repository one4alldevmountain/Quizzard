import React from 'react';
import LandingView from './Components/Landing/LandingView';
import GetQuizByPin from './Components/GetQuizByPin/GetQuizByPinView';
import RegisterView from './Components/Auth/RegisterView';
import LoginView from './Components/Auth/LoginView';
import { Switch, Route } from 'react-router-dom';





export default (
    <Switch>
       <Route component={LandingView} exact path="/" />
       <Route component={GetQuizByPin} path="/Pin" />
       <Route component={RegisterView} path="/Register" />
       <Route component={LoginView} path="/Login" />
    </Switch>

)

