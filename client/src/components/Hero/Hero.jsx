import React, { useState } from 'react'
import classes from './Hero.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

const Hero = () => {

  const [type, setType] = useState("booze");
  const [priceRange, setPriceRange] = useState("0");

  const handleSearch = () => {

  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your popular event</h2>
        <h5>Search the best selection of events for you</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select Type</option>
            <option value="booze">Booze</option>
            <option value="crafts">Crafts</option>
            <option value="dating">Dating</option>
            <option value="gaming">Gaming</option>
            <option value="sports">Sports</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Ticket Range</option>
            <option value="0">0</option>
            <option value="1">1 - 10</option>
            <option value="2">10 - 20</option>
            <option value="3">20 - 30</option>
            <option value="4">30+</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon} />
          
        </div>
      </div>
    </div>
  )
}

export default Hero