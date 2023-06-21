import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import classes from './EditEvent.module.css'

const EditEvent = () => {

    const { id } = useParams()
    const { token } = useSelector((state) => state.auth)
    const [eventDetails, setEventDetails] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [initialPhoto, setInitialPhoto] = useState(null)
    const[error, setError] = useState(false)
    const [emptyFields, setEmptyFields] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEventDetails = async() => {
            try {
                const data = await request(`/event/find/${id}`, 'GET')
                setEventDetails(data)
                setPhoto(data.img)
                setInitialPhoto(data.img)
            } catch (error) {
                console.error(error)
            }
        }
        fetchEventDetails()
    }, [id])

    const handleState = (e) => {
        setEventDetails(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        let filename = initialPhoto
        if (photo && photo !== initialPhoto) {
            const formData = new FormData()
            filename = crypto.randomUUID() + photo.name
            formData.append('filename', filename)
            formData.append('image', photo)

            const options = {
                'Authorization': `Bearer ${token}`,

            }

            await request("/upload/image", 'POST', options, formData, true)
        }

        try {
            if(Object.values(eventDetails).some((v) => v ==='')) {
                setEmptyFields(true)
                setTimeout(() => {
                    setEmptyFields(false)
                }, 2500)
                return
            }

            const options = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

            await request(`/event/${id}`, 'PUT', options, {...eventDetails, img: filename })
            navigate(`/eventDetail/${id}`)

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
            <h2>Edit Event</h2>
            <form onSubmit={handleUpdate}>
                <input value={eventDetails?.title} type="text" placeholder='Title' name='title' onChange={handleState} />
                <select required name='type' onChange={handleState}>
                    <option disabled>Select Type</option>
                    <option value="booze">Booze</option>
                    <option value="craft">Crafts</option>
                    <option value="dating">Dating</option>
                    <option value="gaming">Gaming</option>
                    <option value="sports">Sports</option>
                </select>
                <input value={eventDetails?.desc} name="desc" placeholder="Desc" onChange={handleState} />
                <select required name="crowd" onChange={handleState}>
                <option disabled>Select Crowd</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    
                </select>
                <input value={eventDetails?.price} type="number" placeholder='Price' name='price' onChange={handleState}/>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                    <label htmlFor="photo">Event Photo <AiOutlineFileImage /></label>
                    <input
                    type="file"
                    id='photo'
                    style={{ display:'none' }}
                    onChange={(e) => setPhoto(e.target.files[0])}/>
                    {photo && <p>{photo.name}</p>}
                </div>
                <button type='submit'>Edit</button>
            </form>
            {error && (
                <div className={classes.error}>
                    There was an error editing the event. Try again.
                    </div>
            )}
            {emptyFields && (
                <div className={classes.error}>
                    All fields must be filled!
                    </div>
            )}
        </div>
    </div>
  )
}

export default EditEvent