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
const axios = require('axios')

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [gamesData, setGamesData] = useState(null)

  console.log('Current user is...')
  console.log(currentUser)

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      axios(`${REACT_APP_SERVER_URL}game/all`)
      .then(res => {
        setGamesData(res.data)
      })
    } else {
      console.log(localStorage.getItem('jwtToken'))
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken);
      setIsAuthenticated(true);

      axios(`${REACT_APP_SERVER_URL}auth/data/${token.id}`).then(res => {
        setGamesData(res.data.gamesData)
        setCurrentUser(res.data.currentUser)
      })
      .catch(err => {
        handleLogout()
      })
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  return (
    <div>
      < Navbar currentUser={currentUser} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/" component={ Home } />

        <Route exact path="/auth/signup" render={(props) => {
          return < Signup nowCurrentUser={nowCurrentUser} currentUser={currentUser} /> 
         }} />
        <Route exact path="/auth/login" render={(props) => {
          return < Login nowCurrentUser={nowCurrentUser} currentUser={currentUser} /> 
         }} />
        <Route exact path="/auth/myprofile" render={(props) => {
          return < Profile currentUser={currentUser} user={currentUser} /> 
         }} />
        <Route exact path="/auth/user/:id" render={(props) => {
          return < Profile search={props.match.params.id} /> 
         }} />

        <Route exact path="/character/view/:id" render={(props) => {
          return < Character characterId={'603da6d11a318371b02f75f3'} /> 
         }} />
        <Route exact path="/character/new" render={() => {
          return < WriteCharacter currentUser={currentUser} nowCurrentUser={nowCurrentUser} />
        }} />

        <Route exact path="/games/all" render={(props) => {
          return < Games gamesData={gamesData} /> 
         }} />
        <Route exact path="/games/all/:search" render={(props) => {
          return < Games gamesData={gamesData} search={props.match.params.search} /> 
         }} />

        <Route exact path="/game/new" render={() => {
          return < NewGame currentUser={currentUser} /> }} />
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
