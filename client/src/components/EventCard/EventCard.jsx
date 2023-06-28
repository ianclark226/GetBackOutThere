import React from 'react'
import classes from './EventCard.module.css'
import { Link } from 'react-router-dom'
import person from '../../assets/person.webp'
import { BASE_URL } from '../../util/fetchAPI'

const EventCard = ({ event }) => {

    const ownerProfileImg = event?.currentOwner?.profileImg

  return (
    <div key={event._id} className={classes.event}>
        <Link to={`/eventDetail/${event._id}`} className={classes.imgContainer}>
            {/* <img src={`https://get-back-out-there.onrender.com/images/${event?.img}` || `http://localhost:5000/images/${event?.img}`} alt="profile img" /> */}
            <img src={`${BASE_URL}/images/${event?.img}`} alt="profile img" />
        </Link>
        <div className={classes.details}>
            <div className={classes.priceAndOwner}>
                <span className={classes.price}>$ {event.price}</span>
                {/* <img src={ownerProfileImg ? `https://get-back-out-there.onrender.com/images/${ownerProfileImg}` || `http://localhost:5000/images/${ownerProfileImg}` : person} className={classes.owner} alt="owner" /> */}
                <img src={ownerProfileImg ? `${BASE_URL}/images/${ownerProfileImg}` : person} className={classes.owner} alt="owner" />
            </div>
            
        </div>
        <div className={classes.desc}>
            {event.desc}
        </div>
    </div>
  )
}

export default EventCard