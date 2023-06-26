import React, { useState, useEffect } from 'react'
import classes from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillDoorOpenFill, BsHouseDoor } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'

const Navbar = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const {user, token } = useSelector((state) => state.auth)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setState(prev => {
      return {...prev, crowd: 'small', type: 'booze'}
    })
  }, [])

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const scrollToTop = () => {
    window.scrollTo(0,0)
  }


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
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500)
      return
    }

    try {
      const options = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }

      await request("/event", 'POST', options, { ...state, img: filename })
     
      handleCloseForm()
      setShowModal(false)
      setShowForm(false)
      
    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500)
    }
  }



  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")

  }
  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to="/" onClick={scrollToTop} className={classes.left}>
          GetBackOutThere <BsFillDoorOpenFill />
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
            <span className={classes.username} onClick={() => setShowModal(prev => !prev)}>Hello {user.username}!</span>
            {showModal && (
              <div className={classes.userModal}>
                <AiOutlineClose onClick={() => setShowModal(prev => !prev)} className={classes.userModalClose} />
                <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
                <Link to={'/my-profile'} onClick={() => setShowModal(prev => !prev)} className={classes.myProfile}>My Profile</Link>
                <Link onClick={() => setShowForm(true)} className={classes.list}>List your Event</Link>
              </div>
            )}

            
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
                <input type="text" placeholder='Crowd Size...' name="crowd" onChange={handleState} />
                <input type="text" placeholder='Location...' name="location" onChange={handleState} />
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '50%'}}>
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
      {
        <div className={classes.mobileNav}>
          {showMobileNav && 
          <div className={classes.navigation}>
            <Link to="/" className={classes.left}>
          Events <BsHouseDoor />
        </Link>
        <AiOutlineClose onClick={() => setShowMobileNav(false)} className={classes.mobileCloseIcon} />
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
                <input type="text" placeholder='Crowd Size...' name="crowd" onChange={handleState} />
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
          }
          {!showMobileNav && <GiHamburgerMenu onClick={() =>  setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon}/>} 
        </div>
      }

      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
          </div>
      )}
    </div>
  )
}

export default Navbar