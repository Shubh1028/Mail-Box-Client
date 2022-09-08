import React, {Fragment} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import MainNavigation from './components/layout/MainNavigation';
import Home from './components/pages/Home';
import Inbox from './components/pages/Inbox';
import MailRead from './components/pages/MailRead';
import Sent from './components/pages/Sent';
import Banner from './components/pages/Banner';

function App() {
  const isToken = localStorage.getItem("token");
  return (
   <Fragment>
    <MainNavigation/>
    <Banner/>
    <Switch>
    <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
   {isToken && <Route path='/home' exact> <Home/> </Route> }
   {isToken &&  <Route path='/inbox' exact><Inbox/></Route>}
   {isToken &&   <Route path='/inbox/:id' exact> <MailRead  isSent={false}/></Route>}
   {isToken &&  <Route path='/sent' exact><Sent/></Route>}
   {isToken && <Route path='/sent/:id' exact><MailRead  isSent={true}/></Route>}
   {!isToken && <Route path='/signup'> <SignUp /></Route>}
   {!isToken &&<Route path='/login'><Login /></Route>}
       <Route path="*">
          <Redirect to="/login" />
        </Route>
    </Switch>
   </Fragment>
  );
}

export default App;
