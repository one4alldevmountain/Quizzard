import React from 'react';
import LandingView from './Components/Landing/LandingView';
import TakerpinView from './Components/Takerpin/TakerpinView';
import RegisterView from './Components/Auth/RegisterView';
import LoginView from './Components/Auth/LoginView';
import { Switch, Route } from 'react-router-dom';





export default (
    <Switch>
       <Route component={LandingView} exact path="/" />
       <Route component={TakerpinView} path="/Pin" />
       <Route component={RegisterView} path="/Register" />
       <Route component={LoginView} path="/Login" />
    </Switch>

)

