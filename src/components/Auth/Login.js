import React, { useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import { Form, Col } from 'react-bootstrap'
import setAuthToken from '../../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
const axios = require('axios')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = (props) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Handling input')
        console.log(email, password)

        const userData = { email, password };
        axios.post(`${REACT_APP_SERVER_URL}auth/login`, userData)
        .then(response => {
            console.log(response)
            console.log(response.data.token)
            const token = response.data.token;
            // Save token to localStorage
            console.log('Setting...')
            console.log(token)
            localStorage.setItem('jwtToken',token);
            // Set token to auth header
            console.log('Authing...')
            setAuthToken(token);
            // Decode token to get the user data
            console.log('Decoding...')
            const decoded = jwt_decode(token);
            console.log(decoded)
            // Set current user
            props.nowCurrentUser(response.data.foundUser);
        })
        .catch(error => {
            console.log(`Login error`, error)
            setError(true)
        });
    }

    if (props.currentUser) return <Redirect to="/auth/myprofile" currentUser={props.currentUser} />

    let errorMsg = error ? <p>Error logging in</p> : null

    return (
        <div>
            <h1>Login</h1>
            {errorMsg}
            < Form >
                <label>Email</label>
                < Form.Control type='emailnpm start
                ' onChange={(e)=>{setEmail(e.target.value)}} />

                <label>Password</label>
                < Form.Control type='password' onChange={(e)=>{setPassword(e.target.value)}} />

                < input type='submit' onClick={(e)=>{handleSubmit(e)}} />
            </ Form >
        </div>
    )
}

export default Login;
