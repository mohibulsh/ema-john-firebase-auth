import React, { useContext, useState } from 'react';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
    const navigate =useNavigate()
    const location =useLocation()
    const [show,setShow]=useState(true)
    console.log(location)
    const {logInMethod}= useContext(AuthContext)
    let from = location.state?.from?.pathname || "/";
    const handleSignIn =(event)=>{
        event.preventDefault()
        const form=event.target;
        const email =form.email.value;
        const password = form.password.value;
        console.log(email,password)
        logInMethod(email,password)
        .then(result=>{
            const logInUser =result.user;
            console.log(logInUser)
            navigate(from, { replace: true });
        })
        .catch(error=>{
            console.log(error.message)
        })
        event.target.reset()
    }
    return (
        <div className='form-container'> 
        <h4 className='form-title'> Please Login</h4>
        <form onSubmit={handleSignIn}>
            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="email"  required/>
            </div>
             <div className='form-control'>
                <label htmlFor="">Password</label>
                <input className='showInptField' type={show?'password':'text'} 
                name="password" id="password"  required/>
            </div>
            <p onClick={()=>setShow(!show)} className='showtoggle'>
                {
                    show? <span><FontAwesomeIcon icon={faEye} /></span>:
                    <span><FontAwesomeIcon icon={faEyeSlash} /></span>
                }
            </p>
            <div >
                <input className='submit-btn' type="submit" value="LogIn" />
            </div>
        </form>
        <div className='small-link'>
                    <small >New to ema-john?
                        <span><Link to="/login">Create new Account</Link></span></small>
                 </div>
    </div>
    );
};

export default Login;