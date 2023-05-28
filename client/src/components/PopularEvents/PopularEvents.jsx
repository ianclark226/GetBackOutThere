import React, { useEffect, useState } from 'react'
import classes from './PopularEvents.module.css'
import { Link } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import img1 from '../../assets/bar.jpeg'
import img2 from '../../assets/crafts.jpeg'
import img3 from '../../assets/dating.jpeg'
import img4 from '../../assets/gaming.webp'
import img5 from '../../assets/sports.jpeg'

const PopularEvents = () => {

  const [boozeEvents, setBoozeEvents] = useState(0)
  const [craftEvents, setCraftEvents] = useState(0)
  const [datingEvents, setDatingEvents] = useState(0)
  const [gamingEvents, setGamingEvents] = useState(0)
  const [sportEvents, setSportEvents] = useState(0)

  useEffect(() => {
    const fetchNumberEvents = async() => {
      try {
        const data = await request('/event/find/types', "GET")
        setBoozeEvents(data.booze)
         setCraftEvents(data.crafts)
         setDatingEvents(data.dating)
         setGamingEvents(data.gaming)
         setSportEvents(data.sporting)

        


      } catch(error) {
        console.log(error.message)
      }
    }
    fetchNumberEvents();
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of Events</h5>
          <h2>Best type of Events for you</h2>
        </div>
        <div className={classes.events}>
          <Link className={classes.event} to={`/events?type=booze=18priceRange=2`}>
            <img src={img1} alt=""/>
            <div className={classes.quantity}>{boozeEvents} Events</div>
            <h5>Booze Events</h5>
          </Link>
          <Link className={classes.event} to={`/events?type=crafts=18priceRange=2`}>
            <img src={img2} alt=""/>
            <div className={classes.quantity}>{craftEvents} Events</div>
            <h5>Craft Events</h5>
          </Link>
          <Link className={classes.event} to={`/events?type=dating=18priceRange=2`}>
            <img src={img3} alt=""/>
            <div className={classes.quantity}>{datingEvents} Events</div>
            <h5>Dating Events</h5>
          </Link>
          <Link className={classes.event} to={`/events?type=gaming=18priceRange=2`}>
            <img src={img4} alt=""/>
            <div className={classes.quantity}>{gamingEvents} Events</div>
            <h5>Gaming Events</h5>
          </Link>
          <Link className={classes.event} to={`/events?type=sports=18priceRange=2`}>
            <img src={img5} alt=""/>
            <div className={classes.quantity}>{sportEvents} Events</div>
            <h5>Sporting Events</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularEvents