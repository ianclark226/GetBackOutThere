import React, { useState } from 'react'
import classes from './Signup.module.css'
import {Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineFileImage } from 'react-icons/ai'
import { request } from '../../util/fetchAPI'
import { register } from '../../redux/authSlice'
import { BASE_URL } from '../../util/fetchAPI'


 
const Signout = () => {

  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const { token } = useSelector((state) => state.auth)
  const [error, setError] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(Object.values(state).some((v) => v ==='')) {
      setEmptyFields(true)
      setTimeout(() => {
        setEmptyFields(false)
      }, 2500)
    }

    try {
      let filename= null
      if(photo){
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name
        formData.append("filename", filename)
        formData.append('image', photo)

        await fetch(`${BASE_URL}/upload/image`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },

            method: 'POST',
            body: formData
        })
      } else {
        setEmptyFields(true)
        setTimeout(() => {
          setEmptyFields(false)
        }, 2500)
        return
      }

      const headers = {
        'Content-Type': 'application/json'
      }

      const data = await request('/auth/register', 'POST', headers, {...state, profileImg: filename})
      
      dispatch(register(data))
      navigate('/')

    } catch(error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.error(error)
    }
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder='Username...' onChange={handleState}/>
          <input type="email" name='email' placeholder='Email...' onChange={handleState}/>
          <label htmlFor="photo">Upload Photo <AiOutlineFileImage /></label>
          <input id="photo" type="file" style={{display: 'none'}} onChange={(e) => setPhoto(e.target.files[0])}/>
          <input type="password" name="password" placeholder='Password...' onChange={handleState}/>
          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </form>
        {error && (
          <div className={classes.error}>
            There was an error signing up! Try again.
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

export default Signout