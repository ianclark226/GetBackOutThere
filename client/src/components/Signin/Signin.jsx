import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import classes from './Signin.module.css'
import { login } from '../../redux/authSlice'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();

    if(email === '' || password === '') {
      setEmptyFields(true)
      setTimeout(() => {
        setEmptyFields(false)
      }, 2500)
    }

    try {
      const options = {
        'Content-Type': 'application/json'
      }

      const data = await request('/auth/login', 'POST', options, {email, password})
      dispatch(login(data))
      navigate("/")
    
    } catch(err) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.error(err)
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign in</button>
          <p>Already have an account? <Link to='/signup'>Register</Link></p>
        </form>
        {error && (
          <div className={classes.error}>
            There was an error signing in
            Wrong credentials or server error
            </div>
        )}
        {emptyFields && (
          <div className={classes.error}>
            Fill all fields!
            </div>
        )}
      </div>
    </div>
  )
}

export default Signin