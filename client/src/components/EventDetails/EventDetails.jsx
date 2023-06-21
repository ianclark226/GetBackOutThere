import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import classes from './EventDetails.module.css'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import person from '../../assets/person.webp'

const EventDetails = () => {

  const {token, user} = useSelector((state) => state.auth)
  const[eventDetail, setEventDetail] = useState(null)
  const[showForm, setShowForm] = useState(false)
  const[title, setTitle] = useState('')
  const[desc, setDesc] = useState('')
  const{id} = useParams();
  const formRef = useRef();
  const navigate = useNavigate()

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY
  



  useEffect(() => {
    const fetchDetails = async() => {
      try {
      const data = await request(`/event/find/${id}`, "GET")

      setEventDetail(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle('')
    setDesc('')
  }

  const handleContactOwner = async(e) => {
    e.preventDefault();
  

  emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
  }

  const handleDelete = async() => {
    try {
      await request(`/event/${id}`, 'DELETE', {'Authorization': `Bearer ${token}`})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={classes.container}>
      <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '32px', marginTop: '-2.5rem' }}>Event Details</h3>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${eventDetail?.img}`} alt=""/>
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${eventDetail?.title}`}
            {user?._id === eventDetail?.currentOwner?._id && (
              <div className={classes.controls}>
                <Link to={`/editEvent/${id}`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
              </div>)
            }
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndcrowd}>
            <div>Type: <span>{`${eventDetail?.type}`}</span></div>
            <div>Crowd: <span>{`${eventDetail?.crowd}`}</span></div>
          </div>
          <div className={classes.priceAndOwner}>
            <span className={classes.price}><span>Price: $</span>{`${eventDetail?.price}`}</span>
            <span style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              Owner: {eventDetail?.currentOwner?.profileImg
              ? (
              <img src={`http://localhost:5000/images/${eventDetail?.currentOwner?.profileImg}`} alt="" className={classes.owner}/>
              ) : (
                <img src={person} className={classes.owner} alt=""/>
              )
              }</span>
          </div>
          
        </div>
      </div>
      <p className={classes.desc}>
      Desc: <span>{`${eventDetail?.desc}`}</span>
      </p>
      
      <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
        Contact Owner
      </button>
      </div>
      {showForm && (
        <div className={classes.contactForm} onClick={handleCloseForm}>
          <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>Send Email to Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input value={user.email} type="text" placeholder='My Email' name="from_email" />
              <input value={user.username} type="text" placeholder='My Username' name="from_username" />
              <input value={eventDetail.currentOwner.email} type="email" placeholder='Owner Email' name="to_username" />
              <input type="text" placeholder='Title' name="from_title" />
              <input type="text" placeholder='Desc' name="message" />
              <button>Send</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
          </div>
      )
      }
    </div>
    
  )
}

export default EventDetails