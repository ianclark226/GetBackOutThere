import React from 'react'
import classes from './EventCard.module.css'
import { Link } from 'react-router-dom'
import person from '../../assets/person.webp'

const EventCard = ({ event }) => {

    const ownerProfileImg = event?.currentOwner?.profileImg

  return (
    <div key={event._id} className={classes.event}>
        <Link to={`/eventDetail/${event._id}`} className={classes.imgContainer}>
            <img src={`http://localhost:5000/images/${event?.img}`} alt="profile img" />
        </Link>
        <div className={classes.details}>
            <div className={classes.priceAndOwner}>
                <span className={classes.price}>$ {event.price}</span>
                <img src={ownerProfileImg ? `http://localhost:5000/images/${ownerProfileImg}` : person} className={classes.owner} alt="owner" />
            </div>
            
        </div>
        <div className={classes.desc}>
            {event.desc}
        </div>
    </div>
  )
}

export default EventCard