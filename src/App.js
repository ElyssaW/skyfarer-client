import logo from './logo.svg';
import './App.css';
import io from 'socket.io'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

function App() {

  let socket = io({
    auth: {
      name: "Elyssa"
    }
  })

  return (
    <div>
      Running...
    </div>
  )
}

export default App;
