import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import './App.css';
import socketIOClient from 'socket.io-client'

import Login from './components/user/Login'
import Signup from './components/user/Signup'

const ENDPOINT = "http://127.0.0.1:8000";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [response, setResponse] = useState("");
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: '',
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })

    socket.on("FromAPI", data => {
      setResponse(data);
    })
  }, [])

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))

      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  return (
    <div>
      {response}
      < Login setCurrentUser={nowCurrentUser} />
      < Signup setCurrentUser={nowCurrentUser} />
    </div>
  )
}

export default App;
