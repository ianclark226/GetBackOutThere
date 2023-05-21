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
              <Link to={`/eventDetail/${event._id}`} className={classes.imgContainer}>
                <img src={img} alt="" />
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>$ {event?.price}</span>
                  <img src={person} className={classes.owner} alt="person"/>
                </div>
                <div className={classes.desc}>
                  {event?.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  )
}

export default FeaturedEvents