import React, { useEffect, useRef, useState } from 'react';
import classes from './EventDetails.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { request } from '../../util/fetchAPI';
import { AiOutlineClose } from 'react-icons/ai';
import { emailjs } from '@emailjs/browser'


const EventDetails = () => {

  const {user} = useSelector((state) => state.auth)
  const [eventDetail, setEventDetail] = useState(null)
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const{id} = useParams()
  const formRef = useRef()

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/event/find/${id}`, 'GET')
        setEventDetail(data)
        
      } catch (error) {
        console.error(error)
        
      }
    }
    fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle('')
    setDesc('')
  }

  const handleContactOwner = async (e) => {
    e.preventDefault()
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
    
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapp}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${eventDetail?.img}`} alt="" />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${eventDetail?.title}`} 
          </h3>
          <div className={classes.details}>
            <div className={classes.type}>
              <div>Type: <span>{`${eventDetail.type}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: $</span>{`${eventDetail?.price}`}</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                Owner <img src={`http://localhost:5000/images/${eventDetail?.currentOwner?.profileImg}`} alt="" className={classes.owner}/>
              </span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${eventDetail?.desc}`}</span>
          </p>
          <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
            Contact Owner
          </button>
        </div>
      </div>
      {
      showForm && 
        <div className={classes.contactForm} onClick={handleCloseForm}>
          <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>Send Message to Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input value={user?.email} type="text" placeholder='My Email' name='from_email' />
              <input value={user?.username} type="text" placeholder='My Username' name='from_username' />
              <input value={eventDetail?.currentOwner.email} type="email" placeholder='Owner Email' name='to_email' />
              <input value={title} type="text" placeholder='Title' name='from_title' />
              <input value={desc} type="email" placeholder='Description' name='message' />
              <button>Send</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
        </div>
        </div>
      
      }
    </div>
    
  )
}

export default EventDetails