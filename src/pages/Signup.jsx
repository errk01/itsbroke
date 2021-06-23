import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../helpers/auth';
import { signInWithGoogle } from '../helpers/auth'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  // const [value, setValue] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    console.log('email', email);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    console.log('password', password);
  }

  const googleSignin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(error)
    try {
      await signup(email, password)
    }
    catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up to the <Link to="/">Chat App</Link>
        </h1>
        <p>Fill out the form to use the app</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
        </div>
        <button onClick={googleSignin} type="button">Sign in with Google</button>
        <hr></hr>
        <p>If you have a account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
} export default Signup