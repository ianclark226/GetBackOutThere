import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.webp'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'

const MyProfile = () => {

    const { user, token } = useSelector((state) => state.auth)
    const [listedEvents, setListedEvents] = useState([])
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                <img className={classes.userProfileImg} src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} alt=""/>
                    <div className={classes.userData}>
                        <h3>{user?.username}</h3>
                        <h4>{user?.email}</h4>
                    </div>
            </div>
            <div className={classes.buttons}>
                <button className={`${classes.button} ${activeBtn === 0 && classes.active}`} onClick={() => setActiveBtn(prev => 0)}>
                    Listed Events
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
                                    <img src={`http://localhost:5000/images/${listedEvent?.img}`} alt="" />
                                </Link>
                                <div className={classes.detials}>
                                    <div className={classes.priceAndOwner}>
                                        <span className={classes.price}>$ {listedEvent.price}</span>
                                        <img src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} className={classes.owner} alt=''/>
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