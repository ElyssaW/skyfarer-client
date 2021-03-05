import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import './App.css';
import socketIOClient from 'socket.io-client'

// Base components
import Home from './components/Base/Home'
import Navbar from './components/Base/Navbar'
import NotFound from './components/Base/NotFound'

// User components
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Profile from './components/Auth/Profile'

// Character components
import Character from './components/Character/Character'
import WriteCharacter from './components/Character/WriteCharacter'

// Game components
import Game from './components/Game/Game'
import NewGame from './components/Game/NewGame'

// Misc components
import NPC from './components/GM/NPC'
import Ship from './components/GM/Ship'

const ENDPOINT = "http://127.0.0.1:8000";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [response, setResponse] = useState("");

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))

      const socket = socketIOClient(ENDPOINT, {
        withCredentials: '',
        extraHeaders: {
          userId: token.id,
          username: token.username
        }
      })

      console.log(token)

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
      < Navbar />
      <Switch>
        <Route exact path="/" component={ Home } />

        <Route exact path="/auth/signup" component={ Signup } />
        <Route exact path="/auth/login" component={ Login } />
        <Route exact path="/auth/user/:id" component={ Profile } />

        <Route exact path="/character/view/:id" component={ Character } />
        <Route exact path="/character/new" component={ WriteCharacter } />

        <Route exact path="/game/all" component={ Game } />
        <Route exact path="/game/search" component={ Game } />
        <Route exact path="/game/:id" component={ Game } />
        <Route exact path="/game/new" component={ Game } />

        <Route exact path="/gm/npc/:id" component={ NPC } />
        <Route exact path="/gm/ship/:id" component={ Ship } />

        <Route component={ NotFound } />
      </Switch>
    </div>
  )
}

export default App;
