import React, { useState, useEffect } from 'react';
import classes from './FeaturedEvents.module.css';
import { request } from '../../util/fetchAPI';
import { Link } from 'react-router-dom';
import img from '../../assets/booze.jpeg';
import person from '../../assets/Person_icon_BLACK-01.svg.png';

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchFeatured = async() => {
      try {
        const data = await request('/event/find/featured', 'GET')
        setFeaturedEvents(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchFeatured()
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Events you may like</h5>
          <h2>Our Featured Events</h2>
        </div>
        <div className={classes.featuredEvents}>
          {featuredEvents?.map((event) => (
            <divj key={event._id} className={classes.featuredEvent}>
              <Link to={`/eventDetai/${event._id}`} className={classes.imgContainer}>
                <img src= {event.img ? `http://localhost:5000/images${event.img}`: img} alt="eventimg" />
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>$ {event?.price}</span>
                  <img src={person} className={classes.owner} alt="owner" />
                </div>
                
              </div>
            </divj>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedEvents