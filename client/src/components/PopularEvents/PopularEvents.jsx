import React, {useState, useEffect} from 'react';
import classes from './PopularEvents.module.css';
import { Link } from 'react-router-dom';
import img1 from '../../assets/booze.jpeg';
import img2 from '../../assets/crafts.jpeg';
import img3 from '../../assets/dating.jpeg';
import img4 from '../../assets/gaming.jpeg';
import img5 from '../../assets/sports.jpeg';
import {request} from '../../util/fetchAPI.js';

const PopularEvents = () => {
  const [numEvents, setNumEvents] = useState({});

  useEffect(() => {
    const fetchNumberEvents = async () => {
      try {
        const data = await request('/event/find/types', 'GET');
        fetchNumberEvents(data)
      } catch(error) {
        console.error(error.message)
      }
    }
    fetchNumberEvents()
  }, [])
  return (
    <div className={classes.contianer}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of Events</h5>
          <h2>Best type of Events for you</h2>
        </div>
        <div className={classes.properties}>
          <Link className={classes.property} to={`/events?type=boozepriceRange=2`}>
            <img src={img1} alt="booze"/>
            <div className={classes.quantity}>{numEvents?.booze}</div>
            <h5>Booze Events</h5>
          </Link>
          <Link className={classes.property} to={`/events?type=craftspriceRange=2`}>
            <img src={img2} alt="crafts"/>
            <div className={classes.quantity}>{numEvents?.crafts}</div>
            <h5>Craft Events</h5>
          </Link>
          <Link className={classes.property} to={`/events?type=datingpriceRange=2`}>
            <img src={img3} alt="dating"/>
            <div className={classes.quantity}>{numEvents?.dating}</div>
            <h5>Dating Events</h5>
          </Link>
          <Link className={classes.property} to={`/events?type=gamingpriceRange=2`}>
            <img src={img4} alt="gaming"/>
            <div className={classes.quantity}>{numEvents?.gaming}</div>
            <h5>Gaming Events</h5>
          </Link>
          <Link className={classes.property} to={`/events?type=sportspriceRange=2`}>
            <img src={img5} alt="sports"/>
            <div className={classes.quantity}>{numEvents?.sports}</div>
            <h5>Sport Events</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularEvents