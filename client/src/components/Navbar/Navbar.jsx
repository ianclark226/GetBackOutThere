import React, { useState } from 'react'
import classes from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsHouseDoor } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'

const Navbar = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const {user, token } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleListEvent = async (e) => {
    e.preventDefault()

    let filename = null
    if(photo) {
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append("filename", filename)
      formData.append("image", photo)

      // const options = {
      //   "Authorization": `Bearer ${token}`,
      // }

      await request(`/upload/image`, "POST", {}, formData, true)
    } else {
      return
    }

    try {
      const options = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }

      await request("/event", 'POST', options, { ...state, img: filename })
     
      handleCloseForm()
    } catch (error) {
      
    }
  }



  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")

  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.left}>
          Events <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Featured</li>
          <li className={classes.listItem}>Contacts</li>
        </ul>
          <div className={classes.right}>
            {!user ? 
            <>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/signin'>Sign In</Link>
            </>
            : 
            <>
            <span>Hello {user.username}</span>
            <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
            <Link onClick={() => setShowForm(true)} className={classes.list}>List your Event</Link>
            </>
            }
          </div>
      </div>
      {
        showForm && (
          <div className={classes.listEventForm} onClick={handleCloseForm}>
            <div className={classes.listEventWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>List Event</h2>
              <form onSubmit={handleListEvent}>
                <input value={state?.title} type="text" placeholder='Title...' name="title" onChange={handleState} />
                <input type="text" placeholder='Type...' name="type" onChange={handleState} />
                <input type="text" placeholder='Desc...' name="desc" onChange={handleState} />

                <input type="number" placeholder='Price...' name="price" onChange={handleState} />
                <input type="text" placeholder='Crowd Size...' name="crowdsize" onChange={handleState} />
                <input type="text" placeholder='Location...' name="location" onChange={handleState} />
               

                
                
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '50px'}}>
                  <label htmlFor="photo">Event Photo <AiOutlineFileImage /></label>
                  <input type="file" id="photo" style={{display: 'none'}} onChange={(e) => setPhoto(e.target.files[0])} />
                    {photo && <p>{photo.name}</p>}
                </div>
                <button>List Event</button>
              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Navbar