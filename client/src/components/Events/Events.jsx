import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { crowdToIdx } from '../../util/idxToCrowd'
import classes from './Events.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { arrPriceRanges } from '../../util/idxToPrice'
import { Link } from 'react-router-dom'
import person from '../../assets/person.webp'


const Events = () => {
  const [allEvents, setAllEvents] = useState([])
  const[filteredEvents, setFilteredEvents] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1)
  const arrQuery = query.split("&")
  const navigate = useNavigate()
  
  
  

  

  useEffect(() => {
    const fetchAllEvents = async() => {
      const data = await request(`/event/getAll`, 'GET')
      setAllEvents(data)
    }
    fetchAllEvents()
  }, [])

  // parsing query params
  useEffect(() => {
    if (arrQuery && allEvents?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]


        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allEvents, arrQuery])


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }

    console.log(param)
    const filteredEvents = allEvents.filter((eve) => {

      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      // const crowd = crowdToIdx(eve.crowd)

      
      

      if (
        eve.type === options.type
        // && crowd === Number(options.crowd)
        && eve.price >= minPrice && eve.price <= maxPrice
      ) {
        return eve
      }
    })

    const queryStr = `type=${options.type}&crowd=${options.crowd}&priceRange=${options.priceRange}`

    navigate(`/events?${queryStr}`, { replace: true })
    setFilteredEvents(filteredEvents)
  }

  console.log(filteredEvents)


  
  return (
    <div classes={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
        <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select Type</option>
            <option value="booze">Booze</option>
            <option value="crafts">Crafts</option>
            <option value="dating">Dating</option>
            <option value="gaming">Gaming</option>
            <option value="sports">Sports</option>
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled>Select Ticket Range</option>
            <option value="0">0 - 5</option>
            <option value="1">6 - 10</option>
            <option value="2">11 - 20</option>
            <option value="3">21 - 30</option>
            <option value="4">31+</option>
          </select>
          <select value={state?.crowd} name="crowd" onChange={handleState}>
            <option disabled>Select Crowd Size</option>
            <option value="0">Small</option>
            <option value="1">Medium</option>
            <option value="2">Large</option>
          </select>
          <button className={classes.searchBtn}>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon} />
          </button>
        </div>
        {filteredEvents.length > 0 ? (
          <>
          <div className={classes.titles}>
            <h5>Selected Events</h5>
            <h2>Event you may like</h2>
          </div>
          <div className={classes.events}>
            {filteredEvents.map((event) => (
              <div key={event._id} classNmae={classes.event}>
                <Link className={classes.imgContainer} to={`/eventDetail/${event._id}`}>
                  <img style={{ height:'350px', width: '350px', objectFit: 'cover', transition:'100ms all'}}src={`http://localhost:5000/images/${event?.img}`} alt="" />
                </Link>
                <div className={classes.details}>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}>$ {event.price}</span>
                    <img src={person} className={classes.owner} alt=""/>
                  </div>
                  <div className={classes.desc}>
                    {event.desc}
                    {event.crowd}
                  </div>
                  
                </div>
                </div>
            ))}
          </div>
          </>
        ) : <h2 className={classes.noEvent}>We have no Events with those specific requirements</h2>}
      </div>
    </div>
  )
}

export default Events