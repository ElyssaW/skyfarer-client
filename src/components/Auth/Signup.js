import React, { useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col, Container } from 'react-bootstrap'
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
      <Container className='form-div login-div signup-div'>
        <h1 className='title ribbon drop-shadow'><p className='ribbon-border'>Sign Up</p></h1>
        < Form className='form login-form signup' >
          < Form.Row >
            <label>Username</label>
            < Form.Control type='text' onChange={(e)=>{setUsername(e.target.value)}} />
          </Form.Row >

          < Form.Row >         
            <label>Email</label>
            < Form.Control type='text' onChange={(e)=>{setEmail(e.target.value)}} />
          </Form.Row >

          < Form.Row >
            <label>Password</label>
            < Form.Control type='password' onChange={(e)=>{setPassword(e.target.value)}} />
          </Form.Row >

          < Form.Row >
            <label>Confirm Password</label>
            < Form.Control type='password' onChange={(e)=>{setConfirmPassword(e.target.value)}} />
          </Form.Row >

          <input type='submit' className='button long-button drop-shadow' onClick={(e)=>{handleSubmit(e)}} />
        </ Form >
    </Container>
  )
}

export default Signup;
