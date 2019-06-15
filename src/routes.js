import React from 'react';
import LandingView from './Components/Landing/LandingView';
import GetQuizByPin from './Components/GetQuizByPin/GetQuizByPinView';
import RegisterView from './Components/Auth/RegisterView';
import LoginView from './Components/Auth/LoginContainer';
import HomeView from './Components/Home/HomeView';
import SearchView from './Components/Search/SearchView';
import FormView from './Components/Form/FormView';
import { Switch, Route } from 'react-router-dom';





export default (
    <Switch>
       <Route component={LandingView} exact path="/" />
       <Route component={GetQuizByPin} path="/Pin" />
       <Route component={RegisterView} path="/Register" />
       <Route component={LoginView} path="/Login" />
       <Route component={HomeView} path="/Homepage" />
       <Route component={SearchView} path="/Search" />
       {/* <Route component={FormView} path="/Form" /> */}
    </Switch>

)

