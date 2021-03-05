import React, { useState, useEffect} from 'react'

const axios = require('axios')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = (props) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Handling input')
        console.log(email, password)

        const userData = { email, password };
        axios.post(`${REACT_APP_SERVER_URL}auth/login`, userData)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(`Login error`, error)
        });
    }

  return (
    <div>
        <h1>Login</h1>
        <form>
            <label>Email</label>
            <input type='text' onChange={(e)=>{setEmail(e.target.value)}} />

            <label>Password</label>
            <input type='password' onChange={(e)=>{setPassword(e.target.value)}} />

            <input type='submit' onClick={(e)=>{handleSubmit(e)}} />
        </form>
    </div>
  )
}

export default Login;
