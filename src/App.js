import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import './App.css';
import socketIOClient from 'socket.io-client'

// Base components
import Home from './components/Base/Home'
import Navbar from './components/Base/Navbar'
import Loading from './components/Base/Loading'
import NotFound from './components/Base/NotFound'

// User components
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Profile from './components/Profile/Profile'

// Character components
import Character from './components/Character/Character'
import WriteCharacter from './components/Character/NewCharacter'
import EditCharacter from './components/Character/EditCharacter'

// Game components
import Game from './components/Game/Game'
import Games from './components/Games/Games'
import NewGame from './components/Game/NewGame'
import InviteLink from './components/Game/InviteLink'

// Misc components
import NPC from './components/GM/NPC'
import Ship from './components/GM/Ship'
import MessageBacklog from './components/Game/Messages/MessageBacklog';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
const REACT_APP_CLIENT_URL=process.env.REACT_APP_CLIENT_URL
const axios = require('axios')

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [gamesData, setGamesData] = useState(null)

  // Check for current user token in local storage
  useEffect(() => {
    let token

    // If token does not exist...
    if (!localStorage.getItem('jwtToken')) {
      // Set authenticated to false, and grab "guest" information
      setIsAuthenticated(false);
      axios(`${REACT_APP_SERVER_URL}auth/data/guest`)
      .then(res => {
        console.log(res)
        createGameHash(res.data)
      })
    } else {

    // Set authenticated to true, and grab game/user data
      token = jwt_decode(localStorage.getItem('jwtToken'))
      if (Date.now() >= token.exp * 1000) {
        handleLogout()
      }
      setAuthToken(localStorage.jwtToken);
      setIsAuthenticated(true);

      axios(`${REACT_APP_SERVER_URL}auth/data/${token._id}`).then(res => {
        createGameHash(res.data.gamesData)
        setCurrentUser(res.data.currentUser)
      })
    }
  }, []);

  const createGameHash = (games) => {
    let gameHash = {}
    games.forEach(game => {
      gameHash[game._id] = game
    })
    setGamesData(gameHash)
  }

  // Helper function to update React's info on the user, in case a change occurs
  const nowCurrentUser = (userData) => {
    console.log('Current user...')
    console.log(userData)
    setIsAuthenticated(true);
    setCurrentUser(userData);
  }

  // Logs the user out
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setCurrentUser(null);
    setIsAuthenticated(false);
    window.location = `${REACT_APP_CLIENT_URL}auth/login`
  }

  return (
    < div className='main-div' >
      
      < Switch >
        {/* Home route */}
        <Route exact path="/" component={ Home } />
          <div className='main'>
            {/* Nav bar */}
            < Navbar currentUser={currentUser} handleLogout={handleLogout} />

            <Route exact path="/loading" render={(props) => {
              return < Loading currentUser={currentUser} /> 
            }} />

            {/* Signup, Login, profile page */}
            <Route exact path="/auth/signup" render={(props) => {
              return < Signup nowCurrentUser={nowCurrentUser} currentUser={currentUser} /> 
            }} />
            <Route exact path="/auth/login" render={(props) => {
              return < Login nowCurrentUser={nowCurrentUser} currentUser={currentUser} /> 
            }} />
            <Route exact path="/auth/myprofile" render={(props) => {
              if (currentUser) { return < Profile currentUser={currentUser} gamesData={gamesData} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }} />

            {/* Character view, new character, edit character */}
            <Route path="/character/view/:id" render={(props) => {
              if (currentUser) { return < Character characterId={props.match.params.id} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }}/> 
            <Route exact path="/character/new" render={(props) => {
              if (currentUser) { return < WriteCharacter currentUser={currentUser} nowCurrentUser={nowCurrentUser} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }} />
            <Route exact path="/character/edit/:id" render={(props) => {
              if (currentUser) { 
                let character = currentUser.characters.filter(character => character._id === props.match.params.id)
                console.log('Character')
                return < EditCharacter currentUser={currentUser} character={character[0]} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }} />

            {/* All games, search all games */}
            <Route exact path="/games/all" render={(props) => {
              if (currentUser) { return < Games gamesData={gamesData} />} else {
                return < Redirect to='/auth/login' /> 
              } 
            }} />
            <Route exact path="/games/all/:search" render={(props) => {
              if (currentUser) { return < Games gamesData={gamesData} search={props.match.params.search} />} else {
                return < Redirect to='/auth/login' /> 
              } 
            }} />

            {/* New game, view game, view game history */}
            <Route exact path="/game/new" render={(props) => {
              if (currentUser) { return < NewGame currentUser={currentUser} setCurrentUser={setCurrentUser} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }} />
            <Route path="/game/view/:id" render={(props) => {
              if (currentUser) { return < Game currentUser={currentUser} gameId={props.match.params.id} gamesData={gamesData} />} else {
                return < Redirect to='/auth/login' /> 
              } 
            }} />
            <Route path="/game/invite/:id" render={(props) => {
              if (currentUser) { return < InviteLink currentUser={currentUser} gameId={props.match.params.id} gamesData={gamesData} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }} />
            <Route path="/game/history/:id" render={(props) => {
              if (currentUser) { return < MessageBacklog gameId={props.match.params.id} currentUser={currentUser} />} else {
                return < Redirect to='/auth/login' /> 
              }
            }} />

            <Route exact path="/gm/npc/:id" component={ NPC } />
            <Route exact path="/gm/ship/:id" component={ Ship } />

          </div>
          <Route component={ NotFound } />
      </ Switch >
    </ div >
  )
}

export default App;
