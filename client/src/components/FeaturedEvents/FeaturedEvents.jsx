import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import classes from './FeaturedEvents.module.css'
import img from '../../assets/event3.jpeg'
import person from '../../assets/person.webp'

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([])

  useEffect(() => {
    const fetchFeatured = async() => {
      try {
        const data = await request('/event/find/featured', 'GET')
        setFeaturedEvents(data)
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchFeatured()
  }, []) 

  console.log(featuredEvents)
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titels}>
          <h5>Events you may like</h5>
          <h2>Our Featured Events</h2>
        </div>
        <div className={classes.featuredEvents}>
          {featuredEvents.map((event) => (
            <div key={event._id} className={classes.featuredEvent}>
              <Link to="/"></Link>
            </div>
          ))}
        </div>
      </div>
      </div>
  )
}

export default FeaturedEvents