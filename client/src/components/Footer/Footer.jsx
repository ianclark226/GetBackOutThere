import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>This is an app where people who are trying to recover from a post covid world can get back into in person events. Some people have not officially recovered and still rather be inside than with the public. All these event are in person.</p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +123 456 789</span>
          <span>Youtube: EventsRus</span>
          <span>Tiktok: Events R Us</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Timezone: Eastern Standard Time</span>
          <span>Country: United States</span>
          <span>Current Location: Wilmington, Delaware</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer