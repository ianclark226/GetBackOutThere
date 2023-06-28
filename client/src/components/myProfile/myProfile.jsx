import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.webp'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'
import { BASE_URL } from '../../util/fetchAPI'

const MyProfile = () => {

    const { user, token } = useSelector((state) => state.auth)
    const [listedEvents, setListedEvents] = useState([])
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookmarkedEvents, setBookmarkedEvents] = useState([])

    useEffect(() => {
        const fetchListedEvents = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/event/find/my-events`, 'GET', options)
                setListedEvents(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedEvents()
    },[token])

    useEffect(() => {
        const fetchBookmarkedEvents = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/event/find/bookmarked-events`, 'GET', options)
                setBookmarkedEvents(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedEvents()
    }, [token])

    const handleDeleteProfile = async() => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            }
            await request(`/event/find/my-events`, 'GET', options)
            dispatch(logout)
            navigate('signin')
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
        }
    }


  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <div className={classes.profile}>
                <div className={classes.updatedDeleteControls}>
                    <Link className={classes.updateBtn} to={`/update-profile`}>Update Profile</Link>
                    {deleteModal && (
                        <div className={classes.deleteModal}>
                            <button onClick={handleDeleteProfile}>Yes</button>
                            <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                        </div>
                    )}
                    <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}>Delete Profile</button>
                </div> 
                <img className={classes.userProfileImg} src={user?.profileImg ? `${BASE_URL}/images/${user?.profileImg}` : person} alt="profile img"/>
                    <div className={classes.userData}>
                        <h3>{user?.username}</h3>
                        <h4>{user?.email}</h4>
                    </div>
            </div>
            <div className={classes.buttons}>
                <button className={`${classes.button} ${activeBtn === 0 && classes.active}`} onClick={() => setActiveBtn(prev => 0)}>
                    Listed Events
                </button>
                <button className={`${classes.button} ${activeBtn === 1 && classes.active}`} onClick={() => setActiveBtn(prev => 1)}>
                    Bookmarked Events
                </button>
            </div>
            <div className={classes.catelog}>
                {activeBtn === 0 && (
                    <>
                    {listedEvents?.length > 0 && <h2 className={classes.title}>Listed Events</h2>}
                    <div className={classes.events}>
                        {listedEvents?.length > 0 ? listedEvents?.map((listedEvent) => (
                            <div key={listedEvent._id} className={classes.event}>
                                <Link to={`/eventDetail/${listedEvent._id}`} className={classes.imgContainer}>
                                    <img src={`${BASE_URL}/images/${listedEvent?.img}`} alt="listed event" />
                                </Link>
                                <div className={classes.detials}>
                                    <div className={classes.priceAndOwner}>
                                        <span className={classes.price}>$ {listedEvent.price}</span>
                                        <img src={user?.profileImg ? `${BASE_URL}/images/${user?.profileImg}` : person} className={classes.owner} alt='profile img'/>
                                    </div>
                                    
                                </div>
                                <div className={classes.desc}>
                                    {listedEvent?.desc}
                                </div>
                            </div>
                        )) : <h2 className={classes.noListed}>You have no listed Events</h2>}
                    </div>
                    </>
                )}
                {activeBtn === 1 && (
                    <>
                    {bookmarkedEvents?.length > 0 && <h2 className={classes.title}>Bookmarked Events</h2>}
                    <div className={classes.events}>
                        {bookmarkedEvents?.length > 0 ? bookmarkedEvents?.map((bookmarkedEvent) => (
                            <div key={bookmarkedEvent._id} className={classes.event}>
                                <Link to={`/eventDetail/${bookmarkedEvent._id}`} className={classes.imgContainer}>
                                    {/* <img src={`https://get-back-out-there.onrender.com/images/${bookmarkedEvent?.img}` || `https://get-back-out-there.onrender.com/images/${bookmarkedEvent?.img}`} alt="bookmark img" /> */}
                                    <img src={user?.profileImg ? `${BASE_URL}/images/${user?.profileImg}` : person} className={classes.owner} alt='profile img'/>
                                </Link>
                                <div className={classes.details}>
                                    <div className={classes.priceAndOwner}>
                                        <span className={classes.price}>$ {bookmarkedEvent.price}</span>
                                        <img src={person} className={classes.owner} alt="owner"/>
                                    </div>
                                    
                                </div>
                                <div className={classes.desc}>
                                    {bookmarkedEvent?.desc}
                                </div>
                                </div>
                                
                        )) : <h2 className={classes.noListed}>You have no bookmarked Events</h2>}
                    </div>
                    </>
                )}
                {error && (
                    <div className={classes.error}>
                        There was an Error
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default MyProfile