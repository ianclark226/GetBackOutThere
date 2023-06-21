import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={classes.container}>
        <div className={classes.wrappr}>
            <h2>This page doesn't exist.</h2>
            <Link to='/'>
                Go back to Home
            </Link>
        </div>
    </div>
  )
}

export default NotFound