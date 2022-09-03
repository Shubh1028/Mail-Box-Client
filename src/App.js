import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
   <Fragment>
    <Switch>
    <Route path='/' exact>
          <Login/>
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
