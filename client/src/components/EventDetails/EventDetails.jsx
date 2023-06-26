import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import classes from './EventDetails.module.css'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import person from '../../assets/person.webp'
import Comment from '../Comment/Comment'


const EventDetails = ({ comment }) => {

  const {user, token } = useSelector((state) => state.auth)
  const[eventDetail, setEventDetail] = useState(null)
  const[showForm, setShowForm] = useState(false)
  const[title, setTitle] = useState('')
  const[desc, setDesc] = useState('')
  const{id} = useParams();
  const formRef = useRef();
  const navigate = useNavigate()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [success, setSuccess] = useState(false)
  const [comments, setComments] = useState([])
  const [shortcomments, setShortComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY
  



  useEffect(() => {
    const fetchDetails = async() => {
      try {
      const data = await request(`/event/find/${id}`, "GET")
      setIsBookmarked(data?.bookmarkedUsers?.includes(user?._id))

      setEventDetail(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchDetails()
  }, [id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${id}`, 'GET')
        setComments(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  },[id])

  const handleCloseForm = () => {
    setShowForm(false)

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

  const handleBookmark = async() => {
    try {
      await request(`/event/bookmark/${id}`, 'PUT', { Authorization: `Bearer ${token}`})
      setIsBookmarked(prev => !prev)
    } catch(error) {
      console.log(error)
    }
  }

  const handleComment = async() => {
    if(commentText?.length < 2) {
      setShortComments(true)
      setTimeout(() => {
        setShortComments(false)
      }, 2500)
      return
    } 

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }

      const newComment = await request(`/comment`, 'POST', options, { text: commentText, listing: id})
      setComments((prev) => {
        console.log(newComment)
        return [newComment, ...prev]
      })

      setCommentText('')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={classes.container}>
      <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '32px', marginTop: '-2.5rem' }}>Event Details</h3>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${eventDetail?.img}`} alt="event img"/>
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
                <img src={person} className={classes.owner} alt="person"/>
              )
              }</span>
          </div>
          
        </div>
      </div>
      <p className={classes.desc}>
      Desc: <span>{`${eventDetail?.desc}`}</span>
      </p>
      {user?._id !== null && (user?._id !== eventDetail?.currentOwner?._id.toString()) &&
      <div className={classes.contactBookmarkControls}>
        <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
        Contact Owner
      </button>
      <span onClick={handleBookmark}>
        {isBookmarked ? (
          <BsFillBookmarkFill size={20} />
        ): (
          <BsBookmark size={20} />
        )}
      </span>
      </div>
      }
      {user?._id === null && (
        <Link to={'/signin'}>
          <h4 className={classes.noFuncMessage}>
            Sign in to get access
          </h4>
        </Link>
      )}
      
      
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
      {shortcomments && (
        <div>
          <div className={classes.error}>
            Comment must be at least 2 characters long
          </div>
          </div>
      )}
      <div className={classes.commentSection}>
        {/*Comment Input */}
        {user?._id === null && <h3 style={{margin: '0.75rem', fontSize: '24px'}}>Sign in to be able to Comment</h3>}
        {user?._id !== null && <div className={classes.commentInput}>
          
          <input value={commentText} type="text" placeholder='Type Message...' onChange={(e) => setCommentText(e.target.value)} />
          <button onClick={handleComment}>Post</button>
          </div>}

          {/* Display Comments*/}
          <div className={classes.comments}>
            {
              comments?.length > 0 ? (
                comments?.map((comment) => (
                <Comment setComments={setComments} key={comment._id} comment={comment} />
              ))
              )
              
              : (
                <h2 className={classes.noCommentMessage}>
                  No comments
                </h2>
              )
            }
          </div>

      </div>
    </div>
    
  )
}

export default EventDetails