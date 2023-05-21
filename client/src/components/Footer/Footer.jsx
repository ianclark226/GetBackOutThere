import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae necessitatibus reprehenderit maiores blanditiis delectus commodi provident totam, voluptatibus pariatur esse!</p>
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