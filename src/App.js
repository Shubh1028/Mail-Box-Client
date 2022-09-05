import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import MainNavigation from './components/layout/MainNavigation';
import Home from './components/pages/Home';

function App() {
  return (
   <Fragment>
    <MainNavigation/>
    <Switch>
    <Route path='/home' exact>
          <Home/>
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
