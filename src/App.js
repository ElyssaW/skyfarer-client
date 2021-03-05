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
import Games from './components/Games/Games'
import NewGame from './components/Game/NewGame'

// Misc components
import NPC from './components/GM/NPC'
import Ship from './components/GM/Ship'

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
        <Route exact path="/auth/user/:id" render={(props) => {
          return < Profile search={props.match.params.id} /> 
         }} />

        <Route exact path="/character/view/:id" render={(props) => {
          return < Character characterId={'603da6d11a318371b02f75f3'} /> 
         }} />
        <Route exact path="/character/new" component={ WriteCharacter } />

        <Route exact path="/games/all" component={ Games } />
        <Route exact path="/games/all/:search" render={(props) => {
          return < Games search={props.match.params.search} /> 
         }} />

        <Route exact path="/game/new" component={ NewGame } />
        <Route path="/game/:id" render={(props) => {
          return < Game currentUser={currentUser} /> 
         }} />
        <Route path="/game/:id/history" render={(props) => {
          return < Game search={props.match.params.id} /> 
         }} />

        <Route exact path="/gm/npc/:id" component={ NPC } />
        <Route exact path="/gm/ship/:id" component={ Ship } />

        <Route component={ NotFound } />
      </Switch>
    </div>
  )
}

export default App;
