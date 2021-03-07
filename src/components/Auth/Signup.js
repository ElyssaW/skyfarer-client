import React, { useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Signup= (props) => {

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const handleSubmit = (e) => {
      e.preventDefault()
      
      console.log('Handling input')
      console.log(email, username, password, confirmPassword)

      if (password === confirmPassword) {
        const userData = { email, username, password };
        axios.post(`${REACT_APP_SERVER_URL}auth/signup`, userData)
        .then(response => {
          const { token } = response.data;
          localStorage.setItem('jwtToken', token);
          setAuthToken(token);
          const decoded = jwt_decode(token)
          props.nowCurrentUser(decoded)
        })
        .catch(error => {
            console.log(`Login error`, error)
        });
      }
    }

  if (props.currentUser) return <Redirect to="/auth/myprofile" currentUser={props.currentUser} />

  return (
    <div>
        <h1>Sign Up</h1>
        <form>
            <label>Username</label>
            <input type='text' onChange={(e)=>{setUsername(e.target.value)}} />

            <label>Email</label>
            <input type='text' onChange={(e)=>{setEmail(e.target.value)}} />

            <label>Password</label>
            <input type='password' onChange={(e)=>{setPassword(e.target.value)}} />

            <label>Confirm Password</label>
            <input type='password' onChange={(e)=>{setConfirmPassword(e.target.value)}} />

            <input type='submit' onClick={(e)=>{handleSubmit(e)}} />
        </form>
    </div>
  )
}

export default Signup;
