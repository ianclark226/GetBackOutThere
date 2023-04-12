import React from 'react';
import classes from './Newsletter.module.css';
import { FiSend } from 'react-icons/fi';

const Newsletter = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Want to get the lastet offers?</h5>
          <h2>Send us your email and we will do the rest</h2>
        </div>
        <div className={classes.inputContainer}>
          <input type="email" placeholder='Type Email...' />
          <FiSend className={classes.sendIcon} />
        </div>
      </div>
    </div>
  )
}

export default Newsletter