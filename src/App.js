import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import MainNavigation from './components/layout/MainNavigation';
import Home from './components/pages/Home';
import Inbox from './components/pages/Inbox';

function App() {
  return (
   <Fragment>
    <MainNavigation/>
    <Switch>
    <Route path='/home' exact>
          <Home/>
        </Route>
        <Route path='/inbox'>
          <Inbox/>
        </Route>
        <Route path='/signup'>
          <SignUp />
      </Route> 
      <Route path='/login'>
       <Login />
       </Route>
    </Switch>
   </Fragment>
  );
}

export default App;
