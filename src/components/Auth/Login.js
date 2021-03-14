import React, { useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import { Form, Col } from 'react-bootstrap'
import setAuthToken from '../../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
import Loading from '../Base/Loading'
const axios = require('axios')

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = (props) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = { email, password };
        axios.post(`${REACT_APP_SERVER_URL}auth/login`, userData)
        .then(response => {
            const token = response.data.token;
            // Save token to localStorage
            localStorage.setItem('jwtToken',token);
            // Set token to auth header
            setAuthToken(token);
            // Set current user
            props.nowCurrentUser(response.data.currentUser);
        })
        .catch(error => {
            console.log(`Login error`, error)
            setError(true)
        });
    }

    if (props.currentUser) return <Redirect to="/auth/myprofile" currentUser={props.currentUser} />

    let errorMsg = error ? <p>Error logging in</p> : null

    return (
        <div className='container'>
        <div className='form-div login-div'>
            <h1 className='title block-title form-title'>Login</h1>
            {errorMsg}
            < Form className='form login-form'>
                <label>Email</label>
                < Form.Control type='emailnpm start
                ' onChange={(e)=>{setEmail(e.target.value)}} />

                <label>Password</label>
                < Form.Control type='password' onChange={(e)=>{setPassword(e.target.value)}} />

                < input type='submit' className='button long-button' onClick={(e)=>{handleSubmit(e)}} />
            </ Form >
        </div>
        </div>
    )
}

export default Login;
