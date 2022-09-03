import React, {Fragment, useRef} from 'react'
import "./SignUp.css";


const SignUp = () => {
    let fetchEmailRef = useRef();
    let fetchPasswordRef = useRef();
    let fetchCpasswordRef = useRef();

   

    const signupFormHandler = (e) => {
        e.preventDefault();
        let enteredEmail = fetchEmailRef.current.value;
        let enteredPassword = fetchPasswordRef.current.value;
        let enteredCpassword = fetchCpasswordRef.current.value;
         
if(enteredEmail && enteredPassword && enteredCpassword && enteredPassword === enteredCpassword) {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN2Ien_FSPnUrgcBkcpVBd5bhaMiDHsac', {
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
              res.json().then(data => {localStorage.setItem('token',data.idToken)})
              fetchEmailRef.current.value = '';
              fetchPasswordRef.current.value = '';
              fetchCpasswordRef.current.value = '';

              console.log('Succesfully SignedUp!!')
            } else {
              return res.json().then(data => {
                alert(data.error.message);
              });
            }
          }
          )
        }
        else if(enteredPassword !== enteredCpassword) {
          alert('Password and Confirm Password Should be same')
        } else {
          alert ('Please Fill All The Details')
        }
    }
  
  return (
    <Fragment>
   <form className="contact-form" onSubmit={signupFormHandler}>
    <h1>Sign Up 👇</h1>
    <div>
        <label htmlFor="email">Email</label><br/>
        <input type='email' id='email' placeholder="Enter Your Email" ref={fetchEmailRef}/>
    </div>
    <div>
        <label htmlFor="password">Password</label><br/>
        <input type='password' id='password' placeholder="Enter Your Password" ref={fetchPasswordRef}/>
    </div>
    <div>
        <label htmlFor="cpassword">Confirm Password</label><br/>
        <input type='password' id='cpassword' placeholder="Confirm Your Password" ref={fetchCpasswordRef}/>
    </div>
    <button type='submit'>Submit</button>
    {/* <p>Have an account ?<NavLink to='/login'> Login</NavLink></p> */}
   </form>
   
   </Fragment>
  );
};
export default SignUp;