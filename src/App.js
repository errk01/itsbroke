import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Chat from './pages/Chat'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { auth } from './service/firebase'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? < Component {...props} />
        // : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        : <Redirect to="/signup" />
      }
    />
  )
}

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? < Component {...props} />
        : <Redirect to='/chat' />
      }
    />
  )
}

function App() {
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(true)


  // if the user is authenticated render the components and the info needed 
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  }, [])

  return loading === true ? <h2>Loading...</h2> : (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        />
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={Signup}
        />

        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        />
      </Switch>
    </Router>
  );
}

export default App;
