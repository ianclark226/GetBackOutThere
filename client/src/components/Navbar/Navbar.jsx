import React, { useState, scrollToTop } from 'react';
import classes from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineFileImage, AiOutlineClose, GiHamburgerMenu } from 'react-icons/ai';
import { logout } from '../../redux/authSlice';
import { request } from '../../util/fetchAPI';


const Navbar = () => {
  const [showForm, setShowForm] = useState(false)
  const { user, token } = useSelector((state) => state.auth)
  const [state, setState] = useState({})
  const[photo, setPhoto] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleListEvent = async (e) => {
    e.preventDefault()
    let filename = null
    if(photo) {
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append('filename', filename)
      formData.append('image', photo)
      
      await request('/upload/image', 'POST', {}, formData, true)
      
    } else {
      return
    }

    try {
      const options = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const data = await request('/event', 'POST', options, {...state, img: filename})
      console.log(data)
      handleCloseForm()
      
    } catch (error) {
      console.error(error)
      
    }
  }

  const handleLogout = (e) => {
    dispatch(logout())
    navigate('/signout')
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>Get Back Out There <BsHouseDoor /></Link>
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
          <span>Hello{user.username}</span>
          <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
          <Link onClick={() => setShowForm(true)} className={classes.list}>List your Events</Link>
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
                <input type="text" placeholder='Title...' name='title' onChange={handleState} />
                <input type="text" placeholder='Type...' name='type' onChange={handleState} />
                <input type="text" placeholder='Desc...' name='desc' onChange={handleState} />

                <input type="number" placeholder='Price...' name='price' onChange={handleState} />
              

                <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '50%'}}>
                  <label htmlFor='photo'>Event Picture <AiOutlineFileImage /></label>
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
            <Link to='/' onClick={scrollToTop} className={classes.left}>
              Real Estate <BsHouseDoor />
            </Link>
            <AiOutlineClose className={classes.mobileCloseIcon} onClick={() => setShowMobileNav(false)} />
            <ul className={classes.center}>
              <li onClick={scrollToTop} className={classes.listItem}>
                Home
              </li>
              <li className={classes.listItem}>
                About
              </li>
              <li className={classes.listItem}>
                Featured
              </li>
              <li className={classes.listItem}>
                Contacts
              </li>
            </ul>
            <div className={classes.right}>
              {!user ?
                <>
                  <Link to='/signup'>Sign up</Link>
                  <Link to='/signin'>Sign in</Link>
                </>
                :
                <>
                  <span>Hello {user.username}!</span>
                  <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
                  <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
                </>
              }
            </div>
            {showForm &&
              <div className={classes.listPropertyForm} onClick={handleCloseForm}>
                <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                  <h2>List Property</h2>
                  <form onSubmit={handleListEvent}>
                    <input type="text" placeholder='Title' name="title" onChange={handleState} />
                    <input type="text" placeholder='Type' name="type" onChange={handleState} />
                    <input type="text" placeholder='Desc' name="desc" onChange={handleState} />
                    <input type="text" placeholder='Continent' name="continent" onChange={handleState} />
                    <input type="number" placeholder='Price' name="price" onChange={handleState} />
                    <input type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />
                    <input type="number" placeholder='Beds' name="beds" step={1} min={1} onChange={handleState} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                      <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                      <input
                        type="file"
                        id='photo'
                        style={{ display: 'none' }}
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                      {photo && <p>{photo.name}</p>}
                    </div>
                    <button>List property</button>
                  </form>
                  <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
                </div>
              </div>}
          </div>}
        {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon} />}
      </div>
      }
    </div>
  )
}

export default Navbar