import React, {Fragment, useRef} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import "./SignUp.css";
// import AuthContext from '../Store/auth-context';

const Login = () => {
    let fetchEmailRef = useRef();
    let fetchPasswordRef = useRef();
   
 
    const history = useHistory();

    const loginFormHandler = (e) => {
        e.preventDefault();
        let enteredEmail = fetchEmailRef.current.value;
        let enteredPassword = fetchPasswordRef.current.value;
      
         
if(enteredEmail && enteredPassword) {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdJZauQNFCHPG1PLjvZcjucdQn4HiktL0', {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true
          }),
          headers:{ 
            'Content-Type': 'application/json'
         }
          })
          .then( res => {
            if(res.ok) {
              res.json().then(data => {localStorage.setItem('token',data.idToken);
              localStorage.setItem('email', enteredEmail)
            })
                history.replace('/home')  
              console.log('LoggedIn!!')
              window.location.reload()
            } else {
              return res.json().then(data => {
                alert(data.error.message);
              });
            }
          }
          )
        }
      else {
          alert ('Please Fill All The Details')
        }
    }
  
  return (
   <form className="contact-form" onSubmit={loginFormHandler}>
    <h1>Login 👇</h1>
    <div>
        <label htmlFor="email">Email</label><br/>
        <input type='email' id='email' placeholder="Enter Your Email" ref={fetchEmailRef}/>
    </div>
    <div>
        <label htmlFor="password">Password</label><br/>
        <input type='password' id='password' placeholder="Enter Your Password" ref={fetchPasswordRef}/>
    </div>
    <button type='submit'>Submit</button>
    <p>Not Have an Account ? <NavLink to='/signup'>SignUp</NavLink></p>
    {/* <p>Forgot Password ? <NavLink to='/resetPass'>Reset Password</NavLink></p> */}
   </form>
   
  );
};
export default Login;