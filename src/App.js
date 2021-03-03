import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import io from 'socket.io'

import Login from './components/user/Login'
import Signup from './components/user/Signup'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  console.log(currentUser)

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))

      let socket = io({
        auth: {
          userId: token.id
        }
      })

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
      Running...
      < Login setCurrentUser={nowCurrentUser} />
      < Signup setCurrentUser={nowCurrentUser} />
    </div>
  )
}

export default App;
